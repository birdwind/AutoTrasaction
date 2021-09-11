package com.birdwind.springBootInit.view.transaction.converter;

import com.birdwind.springBootInit.base.view.converter.AbstractFormConverter;
import com.birdwind.springBootInit.entity.model.Transaction;
import com.birdwind.springBootInit.entity.service.TransactionService;
import com.birdwind.springBootInit.view.transaction.TransactionCreateForm;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import java.math.BigDecimal;
import java.util.Date;
import java.util.UUID;

@Component
public class TransactionCreateFormConverter extends AbstractFormConverter<TransactionCreateForm, Transaction> {

    @Autowired
    private TransactionService transactionService;

    @Override
    public Transaction convert(TransactionCreateForm source) {
        Transaction target = simpleMapping(source, Transaction.class);
        target.setTransactionUuid(UUID.randomUUID().toString());
        target.setTransactionNo(transactionService.generateTransactionNo(new Date()));
        target.setTotal(source.getPrice().multiply(source.getQuantity()));
        if (target.getType() == 0) {
            target.setLave(target.getQuantity());
        } else {
            target.setLave(BigDecimal.ZERO);
        }
        return target;
    }
}
