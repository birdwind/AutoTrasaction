package com.birdwind.autoTransaction.aop.aspect;

import com.birdwind.autoTransaction.base.aop.CreateFormAspect;
import com.birdwind.autoTransaction.base.exception.EntityNotFoundException;
import com.birdwind.autoTransaction.constans.TransactionErrorConstants;
import com.birdwind.autoTransaction.entity.model.Currency;
import com.birdwind.autoTransaction.entity.model.Transaction;
import com.birdwind.autoTransaction.entity.service.CurrencyService;
import com.birdwind.autoTransaction.entity.utils.FundsUtils;
import com.birdwind.autoTransaction.view.transaction.TransactionCreateForm;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.validation.BindingResult;
import java.math.BigDecimal;

@Component
public class TransactionFormAspect extends CreateFormAspect<TransactionCreateForm> {

    @Autowired
    private CurrencyService currencyService;

    @Autowired
    private FundsUtils fundsUtils;

    @Override
    protected void putAuthenticate(TransactionCreateForm form, BindingResult errors) throws EntityNotFoundException {
        form.setCurrency(currencyService.getCurrencyByCurrencyName(form.getCurrencyName())
            .orElse(new Currency(form.getCurrencyName())));

        if (form.getType() == 0) {
            if (!fundsUtils.isFundsHaveLave(form.getPrice().multiply(form.getQuantity()))) {
                errors.rejectValue("quantity", TransactionErrorConstants.TRANSACTION_FUNDS_INSUFFICIENT);
            }
        } else {
            BigDecimal laveTotal = form.getCurrency().getTransactions().stream()
                .filter(
                    transaction -> transaction.getType() == 0 && transaction.getLave().compareTo(BigDecimal.ZERO) > 0)
                .map(Transaction::getLave).reduce(BigDecimal::add).orElse(BigDecimal.ZERO);
            if (form.getQuantity().compareTo(laveTotal) > 0) {
                errors.rejectValue("quantity", TransactionErrorConstants.TRANSACTION_Lave_INSUFFICIENT);
            }
        }
    }
}
