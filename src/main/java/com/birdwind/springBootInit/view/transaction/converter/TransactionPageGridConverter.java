package com.birdwind.springBootInit.view.transaction.converter;

import com.birdwind.springBootInit.base.dto.mapper.provider.PrimitiveProvider;
import com.birdwind.springBootInit.base.view.grid.abstracts.AbstractPageGridConverter;
import com.birdwind.springBootInit.entity.model.Transaction;
import com.birdwind.springBootInit.view.transaction.TransactionPageGrid;
import com.birdwind.springBootInit.view.transaction.TransactionPageGridRow;
import org.springframework.stereotype.Component;

@Component
public class TransactionPageGridConverter
    extends AbstractPageGridConverter<Transaction, TransactionPageGridRow, TransactionPageGrid> {

    private PrimitiveProvider<Transaction> typeProvider = (source, targetField) -> source.getType() == 0 ? "買入" : "賣出";

    @Override
    public TransactionPageGridRow convert(Transaction source) {

        addValueProvider("type", typeProvider);

        return complexMapping(source, TransactionPageGridRow.class);
    }

}
