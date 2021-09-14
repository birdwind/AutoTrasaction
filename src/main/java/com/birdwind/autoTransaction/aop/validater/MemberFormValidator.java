package com.birdwind.autoTransaction.aop.validater;

import com.birdwind.autoTransaction.base.constans.BaseErrorConstants;
import com.birdwind.autoTransaction.base.validator.CreateFormValidator;
import com.birdwind.autoTransaction.view.member.MemberCreateForm;
import org.apache.commons.lang3.StringUtils;
import org.springframework.validation.BindingResult;

public class MemberFormValidator extends CreateFormValidator<MemberCreateForm> {
    @Override
    protected void putValidate(MemberCreateForm form, BindingResult errors) {
        if (!StringUtils.equals("0", form.getMemberUuid())) {
            errors.rejectValue("memberUuid", BaseErrorConstants.INVALID_UUID);
        }
    }
}
