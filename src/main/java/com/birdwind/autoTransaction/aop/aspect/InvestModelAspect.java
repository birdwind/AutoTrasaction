package com.birdwind.autoTransaction.aop.aspect;

import com.birdwind.autoTransaction.base.aop.AbstractAuthModelAspect;
import com.birdwind.autoTransaction.base.exception.EntityNotFoundException;
import com.birdwind.autoTransaction.constans.InvestErrorConstants;
import com.birdwind.autoTransaction.entity.model.Invest;
import com.birdwind.autoTransaction.entity.service.InvestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class InvestModelAspect extends AbstractAuthModelAspect<Invest> {

    @Autowired
    private InvestService investService;

    @Override
    protected Invest authenticate(String source) throws Throwable {
        return investService.getInvestByInvestUuid(source)
                .orElseThrow(() -> new EntityNotFoundException("InvestUuid", InvestErrorConstants.INVEST_NOT_FOUND));
    }
}
