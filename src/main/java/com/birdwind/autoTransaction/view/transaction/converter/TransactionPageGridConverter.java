package com.birdwind.autoTransaction.view.transaction.converter;

import com.birdwind.autoTransaction.base.dto.mapper.provider.PrimitiveProvider;
import com.birdwind.autoTransaction.base.view.grid.abstracts.AbstractPageGridConverter;
import com.birdwind.autoTransaction.entity.model.Transaction;
import com.birdwind.autoTransaction.view.transaction.TransactionPageGrid;
import com.birdwind.autoTransaction.view.transaction.TransactionPageGridRow;
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
