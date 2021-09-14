package com.birdwind.autoTransaction.view.invest.deposit.converter;

import com.birdwind.autoTransaction.base.utils.LocaleI18nUtils;
import com.birdwind.autoTransaction.base.view.converter.AbstractListConverter;
import com.birdwind.autoTransaction.entity.model.InvestType;
import com.birdwind.autoTransaction.view.invest.deposit.InvestTypeListItem;
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
