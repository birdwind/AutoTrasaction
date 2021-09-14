package com.birdwind.autoTransaction.view.invest.deposit.converter;

import com.birdwind.autoTransaction.base.view.converter.AbstractFormConverter;
import com.birdwind.autoTransaction.entity.model.Invest;
import com.birdwind.autoTransaction.entity.service.InvestService;
import com.birdwind.autoTransaction.view.invest.deposit.InvestDepositUpdateForm;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import java.util.Date;

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
