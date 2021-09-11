package com.birdwind.springBootInit.entity.utils;

import com.birdwind.springBootInit.entity.model.Transaction;
import com.birdwind.springBootInit.entity.service.FundsService;
import com.birdwind.springBootInit.entity.service.TransactionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import java.math.BigDecimal;

@Component
public class FundsUtils {

    @Autowired
    private FundsService fundsService;

    @Autowired
    private TransactionService transactionService;

    public boolean isFundsHaveLave(BigDecimal price) {
        BigDecimal transactionAmountTotal = BigDecimal.ZERO;
        BigDecimal fundsAmountTotal = fundsService.getAllFundsAmountSum();
        for(Transaction transaction :transactionService.getTransactionInLaveLargeZero()){
            transactionAmountTotal = transactionAmountTotal.add(transaction.getLave().multiply(transaction.getPrice()));
        }
        return fundsAmountTotal.subtract(transactionAmountTotal).compareTo(price) >= 0;
    }
}
