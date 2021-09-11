package com.birdwind.springBootInit.view.invest.deposit.converter;

import com.birdwind.springBootInit.base.utils.LocaleI18nUtils;
import com.birdwind.springBootInit.base.view.converter.AbstractListConverter;
import com.birdwind.springBootInit.entity.model.InvestType;
import com.birdwind.springBootInit.view.invest.deposit.InvestTypeListItem;
import org.springframework.stereotype.Component;
import java.io.Serializable;

@Component
public class InvestTypeListConverter extends AbstractListConverter<InvestType, InvestTypeListItem> {
    @Override
    public Serializable getText(InvestType source) {
        return LocaleI18nUtils.getString(source.getInvestTypeValue());
    }

    @Override
    public Serializable getValue(InvestType source) {
        return source.getInvestTypeUuid();
    }

    @Override
    public void setOtherProperty(InvestTypeListItem item, InvestType source) {

    }
}
