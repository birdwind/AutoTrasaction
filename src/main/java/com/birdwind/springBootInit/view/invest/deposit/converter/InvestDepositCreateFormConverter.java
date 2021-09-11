package com.birdwind.springBootInit.view.invest.deposit.converter;

import com.birdwind.springBootInit.base.view.converter.AbstractFormConverter;
import com.birdwind.springBootInit.entity.model.Invest;
import com.birdwind.springBootInit.entity.service.InvestService;
import com.birdwind.springBootInit.view.invest.deposit.InvestDepositCreateForm;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import java.util.Date;
import java.util.UUID;

@Component
public class InvestDepositCreateFormConverter extends AbstractFormConverter<InvestDepositCreateForm, Invest> {

    @Autowired
    private InvestService investService;

    @Override
    public Invest convert(InvestDepositCreateForm source) {
        Invest target = simpleMapping(source, Invest.class);
        target.setInvestNo(investService.generateInvestNo(new Date()));
        target.setInvestUuid(UUID.randomUUID().toString());
        return target;
    }
}
