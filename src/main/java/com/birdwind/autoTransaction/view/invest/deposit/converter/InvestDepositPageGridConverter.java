package com.birdwind.autoTransaction.view.invest.deposit.converter;

import com.birdwind.autoTransaction.base.dto.mapper.provider.PrimitiveProvider;
import com.birdwind.autoTransaction.base.utils.LocaleI18nUtils;
import com.birdwind.autoTransaction.base.view.grid.abstracts.AbstractPageGridConverter;
import com.birdwind.autoTransaction.entity.model.Invest;
import com.birdwind.autoTransaction.entity.model.InvestMemberRelate;
import com.birdwind.autoTransaction.entity.model.Member;
import com.birdwind.autoTransaction.view.invest.deposit.InvestDepositPageGrid;
import com.birdwind.autoTransaction.view.invest.deposit.InvestDepositPageGridRow;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.Optional;

@Component
public class InvestDepositPageGridConverter
    extends AbstractPageGridConverter<Invest, InvestDepositPageGridRow, InvestDepositPageGrid> {

    private PrimitiveProvider<Invest> investTypeUuidProvider =
        (source, targetField) -> LocaleI18nUtils.getString(source.getInvestType().getInvestTypeValue());

    private PrimitiveProvider<Invest> memberProvider =
        (source, targetField) -> Optional.ofNullable(source.getInvestMemberRelates()).orElse(new ArrayList<>()).stream()
            .filter(investMemberRelate -> investMemberRelate.getInvest() == source).map(InvestMemberRelate::getMember)
            .map(Member::getName).findFirst().orElse("");

    @Override
    public InvestDepositPageGridRow convert(Invest source) {
        addValueProvider("investTypeUuid", investTypeUuidProvider);
        addValueProvider("member", memberProvider);
        return complexMapping(source, InvestDepositPageGridRow.class);
    }
}
