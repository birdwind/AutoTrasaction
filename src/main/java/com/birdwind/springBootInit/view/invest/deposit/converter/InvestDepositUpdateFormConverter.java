package com.birdwind.springBootInit.view.invest.deposit.converter;

import com.birdwind.springBootInit.base.view.converter.AbstractFormConverter;
import com.birdwind.springBootInit.entity.model.Invest;
import com.birdwind.springBootInit.entity.service.InvestService;
import com.birdwind.springBootInit.view.invest.deposit.InvestDepositCreateForm;
import com.birdwind.springBootInit.view.invest.deposit.InvestDepositUpdateForm;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import java.util.Date;
import java.util.UUID;

@Component
public class InvestDepositUpdateFormConverter extends AbstractFormConverter<InvestDepositUpdateForm, Invest> {

    @Autowired
    private InvestService investService;

    @Override
    public Invest convert(InvestDepositUpdateForm source) {
        Invest target = simpleMapping(source, source.getInvest());
        target.setAmount(source.getAmount());
        target.setAmountNote(source.getAmountNote());
        target.setInvestDate(source.getInvestDate());
        target.setUpdateDate(new Date());
        return target;
    }
}
