package com.birdwind.springBootInit.aop.validater;

import com.birdwind.springBootInit.base.constans.BaseErrorConstants;
import com.birdwind.springBootInit.base.validator.CreateFormValidator;
import com.birdwind.springBootInit.view.member.MemberCreateForm;
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
