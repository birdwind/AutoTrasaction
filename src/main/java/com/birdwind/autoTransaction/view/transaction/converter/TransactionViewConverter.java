package com.birdwind.autoTransaction.view.transaction.converter;

import com.birdwind.autoTransaction.base.view.converter.AbstractViewConverter;
import com.birdwind.autoTransaction.entity.model.Transaction;
import com.birdwind.autoTransaction.view.transaction.TransactionView;
import org.springframework.stereotype.Component;

@Component
public class TransactionViewConverter extends AbstractViewConverter<Transaction, TransactionView> {

    @Override
    public TransactionView convert(Transaction source) {
        return complexMapping(source, TransactionView.class);
    }
}
