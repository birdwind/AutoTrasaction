package com.birdwind.autoTransaction.aop.validater;

import com.birdwind.autoTransaction.base.constans.BaseErrorConstants;
import com.birdwind.autoTransaction.base.validator.CreateUpdateFormValidator;
import com.birdwind.autoTransaction.view.invest.deposit.InvestDepositCreateForm;
import com.birdwind.autoTransaction.view.invest.deposit.InvestDepositUpdateForm;
import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Component;
import org.springframework.validation.BindingResult;

@Component
public class InvestFormValidator extends CreateUpdateFormValidator<InvestDepositCreateForm, InvestDepositUpdateForm> {

    @Override
    protected void putValidate(InvestDepositCreateForm form, BindingResult errors) {
        if (!StringUtils.equals("0", form.getInvestUuid())) {
            errors.rejectValue("investUuid", BaseErrorConstants.INVALID_UUID);
        }
    }

    @Override
    protected void postValidate(InvestDepositUpdateForm form, BindingResult errors) {}

}
