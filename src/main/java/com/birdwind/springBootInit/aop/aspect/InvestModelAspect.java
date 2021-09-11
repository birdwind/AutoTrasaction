package com.birdwind.springBootInit.aop.aspect;

import com.birdwind.springBootInit.base.aop.AbstractAuthModelAspect;
import com.birdwind.springBootInit.base.exception.EntityNotFoundException;
import com.birdwind.springBootInit.constans.InvestErrorConstants;
import com.birdwind.springBootInit.entity.model.Invest;
import com.birdwind.springBootInit.entity.service.InvestService;
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
