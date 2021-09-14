package com.birdwind.autoTransaction.controller.transaction;

import com.birdwind.autoTransaction.base.annotation.AuthForm;
import com.birdwind.autoTransaction.base.view.filter.FilterForm;
import com.birdwind.autoTransaction.base.view.filter.SearchCondition;
import com.birdwind.autoTransaction.base.view.filter.converter.FilterFormConverter;
import com.birdwind.autoTransaction.entity.model.Earning;
import com.birdwind.autoTransaction.entity.model.EarningMemberRelate;
import com.birdwind.autoTransaction.entity.model.Funds;
import com.birdwind.autoTransaction.entity.model.FundsMemberRelate;
import com.birdwind.autoTransaction.entity.model.Member;
import com.birdwind.autoTransaction.entity.model.Transaction;
import com.birdwind.autoTransaction.entity.model.TransactionBuyerRelate;
import com.birdwind.autoTransaction.entity.model.TransactionInOutRelate;
import com.birdwind.autoTransaction.entity.service.CurrencyService;
import com.birdwind.autoTransaction.entity.service.EarningMemberRelateService;
import com.birdwind.autoTransaction.entity.service.EarningService;
import com.birdwind.autoTransaction.entity.service.FundsService;
import com.birdwind.autoTransaction.entity.service.MemberService;
import com.birdwind.autoTransaction.entity.service.TransactionInOutRelateService;
import com.birdwind.autoTransaction.entity.service.TransactionService;
import com.birdwind.autoTransaction.entityFieldFilter.TransactionEntityFieldFilter;
import com.birdwind.autoTransaction.enums.RoleEnum;
import com.birdwind.autoTransaction.view.transaction.TransactionCreateForm;
import com.birdwind.autoTransaction.view.transaction.TransactionResource;
import com.birdwind.autoTransaction.view.transaction.converter.CurrencyListConverter;
import com.birdwind.autoTransaction.view.transaction.converter.TransactionCreateFormConverter;
import com.birdwind.autoTransaction.view.transaction.converter.TransactionPageGridConverter;
import com.birdwind.autoTransaction.view.transaction.converter.TransactionResourcePacker;
import com.birdwind.autoTransaction.view.transaction.converter.TransactionTemplateConverter;
import com.birdwind.autoTransaction.view.transaction.converter.TransactionViewConverter;
import com.google.common.collect.Lists;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.List;
import javax.transaction.Transactional;
import javax.validation.Valid;

@RestController
@RequestMapping(value = "/api/transaction")
public class TransactionApiController {

    @Autowired
    private TransactionResourcePacker transactionResourcePacker;

    @Autowired
    private TransactionTemplateConverter transactionTemplateConverter;

    @Autowired
    private TransactionViewConverter transactionViewConverter;

    @Autowired
    private TransactionPageGridConverter transactionPageGridConverter;

    @Autowired
    private TransactionCreateFormConverter transactionCreateFormConverter;

    @Autowired
    private CurrencyListConverter currencyListConverter;

    @Autowired
    private TransactionService transactionService;

    @Autowired
    private TransactionInOutRelateService transactionInOutRelateService;

    @Autowired
    private CurrencyService currencyService;

    @Autowired
    private EarningService earningService;

    @Autowired
    private FundsService fundsService;

    @Autowired
    private EarningMemberRelateService earningMemberRelateService;

    @Autowired
    private MemberService memberService;

    private final int TRANSACTION_TYPE_BUY = 0;

    private final int TRANSACTION_TYPE_SALE = 1;

    private final FilterFormConverter<Transaction> transactionEntityFieldFilterConverter =
        new FilterFormConverter<>(TransactionEntityFieldFilter.class);

    @PostMapping(value = {"/grid", "/grid/"})
    public TransactionResource depositGrid(@RequestPart(value = "filter", required = false) FilterForm filterForm) {
        SearchCondition<Transaction> searchCondition = transactionEntityFieldFilterConverter.convert(filterForm);
        return transactionResourcePacker.pack(transactionPageGridConverter
            .convertToPageGrid(transactionService.getTransactionBySearchCondition(searchCondition)));
    }

    @GetMapping(value = {"/template", "/template/"})
    public TransactionResource getCreateTemplate() {
        return transactionResourcePacker
            .pack(transactionTemplateConverter.convert(transactionViewConverter.convert(new Transaction())));
    }

    @Transactional
    @PutMapping(value = {"", "/"})
    public TransactionResource create(
        @AuthForm @Valid @RequestPart("transaction") TransactionCreateForm transactionCreateForm) {
        if (transactionCreateForm.getCurrency().getId() == 0) {
            transactionCreateForm.setCurrency(currencyService.save(transactionCreateForm.getCurrency()));
        }

        Transaction savedTransaction = null;
        Transaction transaction = transactionCreateFormConverter.convert(transactionCreateForm);

        if (transaction.getType() == TRANSACTION_TYPE_SALE) {
            // 售出
            savedTransaction = transactionService.save(transaction);

            BigDecimal transactionQuantity = transaction.getQuantity();
            List<TransactionInOutRelate> transactionInOutRelateList = Lists.newArrayList();
            List<EarningMemberRelate> earningMemberRelateList = Lists.newArrayList();
            List<Funds> fundList = Lists.newArrayList();
            List<Transaction> transactionList =
                transactionService.getTransactionsByCurrencyAndLave(transaction.getCurrency());

            BigDecimal total = BigDecimal.ZERO;

            for (Transaction currentTransaction : transactionList) {
                transactionQuantity = transactionQuantity.subtract(currentTransaction.getLave());

                if (transactionQuantity.compareTo(BigDecimal.ZERO) >= 0) {
                    transactionInOutRelateList.add(
                        new TransactionInOutRelate(currentTransaction, savedTransaction, currentTransaction.getLave()));
                    total = total.add(savedTransaction.getPrice().subtract(currentTransaction.getPrice())
                        .multiply(currentTransaction.getLave()));
                    currentTransaction.setLave(BigDecimal.ZERO);
                } else {
                    currentTransaction.setLave(transactionQuantity.negate());
                    transactionInOutRelateList.add(
                        new TransactionInOutRelate(currentTransaction, savedTransaction, transactionQuantity.negate()));
                    total = total.add(savedTransaction.getPrice().subtract(currentTransaction.getPrice())
                        .multiply(transactionQuantity.negate()));
                }
                if (transactionQuantity.compareTo(BigDecimal.ZERO) <= 0) {
                    break;
                }
            }

            Earning earning = earningService.save(
                new Earning(savedTransaction.getCurrency(), savedTransaction, savedTransaction.getQuantity(), total));

            for (TransactionInOutRelate currentTransactionInOutRelate : transactionInOutRelateList) {
                for (TransactionBuyerRelate transactionBuyerRelate : currentTransactionInOutRelate.getTransactionIn()
                    .getTransactionBuyerRelates()) {

                    BigDecimal earningTotal = savedTransaction.getPrice()
                        .subtract(currentTransactionInOutRelate.getTransactionIn().getPrice())
                        .multiply(currentTransactionInOutRelate.getQuantity())
                        .multiply(currentTransactionInOutRelate.getTransactionIn().getTransactionBuyerRelates().stream()
                            .filter(relate -> relate.getMember() == transactionBuyerRelate.getMember())
                            .map(TransactionBuyerRelate::getPercent).findFirst().orElse(BigDecimal.ZERO));

                    earningMemberRelateList
                        .add(new EarningMemberRelate(earning, transactionBuyerRelate.getMember(), earningTotal));
                    Funds funds = transactionBuyerRelate.getMember().getFundsMemberRelate().getFunds();
                    funds.setAmount(funds.getAmount().add(earningTotal));
                    fundList.add(funds);
                }
            }
            earningMemberRelateService.save(earningMemberRelateList);

            transactionInOutRelateService.save(transactionInOutRelateList);

            fundsService.save(fundList);

        } else if (transaction.getType() == TRANSACTION_TYPE_BUY) {
            // 買入
            List<TransactionBuyerRelate> transactionBuyerRelateList = Lists.newArrayList();
            List<Member> memberList = memberService.getMemberCoreByRoleId(RoleEnum.MEMBER.id());
            BigDecimal totalInvestAmount = memberList.stream().map(Member::getFundsMemberRelate)
                .map(FundsMemberRelate::getFunds).map(Funds::getAmount).reduce(BigDecimal::add).orElse(BigDecimal.ZERO);
            memberList.stream()
                .filter(member -> member.getFundsMemberRelate().getFunds().getAmount().compareTo(BigDecimal.ZERO) > 0)
                .forEach(member -> {
                    BigDecimal percent = member.getFundsMemberRelate().getFunds().getAmount().divide(totalInvestAmount,
                        4, RoundingMode.HALF_UP);
                    transactionBuyerRelateList.add(new TransactionBuyerRelate(transaction, member, percent));
                });
            savedTransaction = transactionService.save(transaction, transactionBuyerRelateList);
        }
        return transactionResourcePacker.pack(transactionViewConverter.convert(savedTransaction));
    }

    @GetMapping(value = {"/list", "/list"})
    public TransactionResource getCurrency() {
        return transactionResourcePacker.pack(currencyListConverter.convert(currencyService.getAllCurrency()));
    }
}
