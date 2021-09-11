package com.birdwind.springBootInit.view.transaction.converter;

import com.birdwind.springBootInit.base.view.converter.AbstractViewConverter;
import com.birdwind.springBootInit.entity.model.Transaction;
import com.birdwind.springBootInit.view.transaction.TransactionView;
import org.springframework.stereotype.Component;

@Component
public class TransactionViewConverter extends AbstractViewConverter<Transaction, TransactionView> {

    @Override
    public TransactionView convert(Transaction source) {
        return complexMapping(source, TransactionView.class);
    }
}
