package com.birdwind.autoTransaction.view.invest.earning.converter;

import com.birdwind.autoTransaction.base.dto.mapper.provider.PrimitiveProvider;
import com.birdwind.autoTransaction.base.view.grid.abstracts.AbstractPageGridConverter;
import com.birdwind.autoTransaction.entity.model.Earning;
import com.birdwind.autoTransaction.entity.model.Invest;
import com.birdwind.autoTransaction.entity.model.InvestMemberRelate;
import com.birdwind.autoTransaction.entity.model.Member;
import com.birdwind.autoTransaction.entity.model.TransactionBuyerRelate;
import com.birdwind.autoTransaction.entity.model.TransactionInOutRelate;
import com.birdwind.autoTransaction.entity.service.EarningService;
import com.birdwind.autoTransaction.entity.service.MemberService;
import com.birdwind.autoTransaction.entity.service.TransactionService;
import com.birdwind.autoTransaction.enums.RoleEnum;
import com.birdwind.autoTransaction.view.invest.earning.InvestEarningPageGrid;
import com.birdwind.autoTransaction.view.invest.earning.InvestEarningPageGridRow;
import com.google.common.collect.Lists;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.List;

@Component
public class InvestEarningPageGridConverter
    extends AbstractPageGridConverter<Member, InvestEarningPageGridRow, InvestEarningPageGrid> {

    @Autowired
    private MemberService memberService;

    @Autowired
    private EarningService earningService;

    @Autowired
    private TransactionService transactionService;

    private BigDecimal currentMemberTotal;

    private BigDecimal currentMemberTotalPercent;

    private BigDecimal currentEarningTotal;

    private PrimitiveProvider<Member> totalProvider = (source, targetField) -> {
        currentMemberTotal = countMemberTotal(source);
        return currentMemberTotal;
    };

    private PrimitiveProvider<Member> totalPercentProvider = (source, targetField) -> {
        if (currentMemberTotal.compareTo(BigDecimal.ZERO) <= 0) {
            currentMemberTotalPercent = BigDecimal.ZERO;
        } else {
            currentMemberTotalPercent =
                currentMemberTotal.divide(memberService.getMemberCoreByRoleId(RoleEnum.MEMBER.id()).stream()
                    .map(this::countMemberTotal).reduce(BigDecimal.ZERO, BigDecimal::add), 4, RoundingMode.HALF_UP);
        }

        return currentMemberTotalPercent.multiply(new BigDecimal(100)).setScale(2, RoundingMode.HALF_UP) + "%";
    };

    private PrimitiveProvider<Member> earningProvider = (source, targetField) -> {
        List<Earning> earningList = earningService.getEarningByMember(source).orElse(Lists.newArrayList());
        currentEarningTotal = BigDecimal.ZERO;
        for (Earning earning : earningList) {
            for (TransactionInOutRelate transactionInOutRelate : earning.getTransaction().getTransactionOutRelates()) {
                currentEarningTotal = currentEarningTotal.add(
                    earning.getTransaction().getPrice().subtract(transactionInOutRelate.getTransactionIn().getPrice())
                        .multiply(transactionInOutRelate.getQuantity())
                        .multiply(transactionInOutRelate.getTransactionIn().getTransactionBuyerRelates().stream()
                            .filter(relate -> relate.getMember() == source).map(TransactionBuyerRelate::getPercent)
                            .findFirst().orElse(BigDecimal.ZERO)));
            }
        }
        return currentEarningTotal;
    };

    private PrimitiveProvider<Member> earningPercentProvider = (source, targetField) -> {
        if (currentEarningTotal.compareTo(BigDecimal.ZERO) == 0) {
            return BigDecimal.ZERO;
        } else {
            return currentEarningTotal.divide(currentMemberTotal, 4, RoundingMode.HALF_UP)
                .multiply(new BigDecimal(100)).setScale(2, RoundingMode.HALF_UP) + "%";
        }
    };

    @Override
    public InvestEarningPageGridRow convert(Member source) {
        addValueProvider("total", totalProvider);
        addValueProvider("totalPercent", totalPercentProvider);
        addValueProvider("earning", earningProvider);
         addValueProvider("earningPercent", earningPercentProvider);
        return complexMapping(source, InvestEarningPageGridRow.class);
    }

    private BigDecimal countMemberTotal(Member source) {
        BigDecimal in = source.getInvestMemberRelates().stream().map(InvestMemberRelate::getInvest)
            .filter(invest -> invest.getStatus() && invest.getInvestType().getInvestTypeId() == 1)
            .map(Invest::getAmount).reduce(BigDecimal.ZERO, BigDecimal::add);

        BigDecimal out = source.getInvestMemberRelates().stream().map(InvestMemberRelate::getInvest)
            .filter(invest -> invest.getStatus() && invest.getInvestType().getInvestTypeId() == 2)
            .map(Invest::getAmount).reduce(BigDecimal.ZERO, BigDecimal::add);
        return in.subtract(out);
    }
}
