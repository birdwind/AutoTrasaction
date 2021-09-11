package com.birdwind.springBootInit.view.transaction.converter;

import com.birdwind.springBootInit.base.view.converter.AbstractListConverter;
import com.birdwind.springBootInit.entity.model.Currency;
import com.birdwind.springBootInit.view.transaction.CurrencyListItem;
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
