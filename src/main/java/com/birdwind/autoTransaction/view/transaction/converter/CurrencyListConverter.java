package com.birdwind.autoTransaction.view.transaction.converter;

import com.birdwind.autoTransaction.base.view.converter.AbstractListConverter;
import com.birdwind.autoTransaction.entity.model.Currency;
import com.birdwind.autoTransaction.view.transaction.CurrencyListItem;
import org.springframework.stereotype.Component;

import java.io.Serializable;

@Component
public class CurrencyListConverter  extends AbstractListConverter<Currency, CurrencyListItem> {
    @Override
    public Serializable getText(Currency source) {
        return source.getCurrencyName();
    }

    @Override
    public Serializable getValue(Currency source) {
        return source.getCurrencyId();
    }

    @Override
    public void setOtherProperty(CurrencyListItem item, Currency source) {

    }
}
