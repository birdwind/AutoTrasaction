package com.birdwind.springBootInit.aop.aspect;

import com.birdwind.springBootInit.base.aop.CreateFormAspect;
import com.birdwind.springBootInit.base.exception.EntityNotFoundException;
import com.birdwind.springBootInit.constans.RoleErrorConstants;
import com.birdwind.springBootInit.entity.model.Role;
import com.birdwind.springBootInit.entity.service.RoleService;
import com.birdwind.springBootInit.enums.RoleEnum;
import com.birdwind.springBootInit.view.member.MemberCreateForm;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.validation.BindingResult;

@Component
public class MemberFormAspect extends CreateFormAspect<MemberCreateForm> {

    @Autowired
    private RoleService roleService;

    @Override
    protected void putAuthenticate(MemberCreateForm form, BindingResult errors) throws EntityNotFoundException {
        Role role = null;
        if (form.getRoleUuid() == null || StringUtils.isEmpty(form.getRoleUuid())) {
            role = roleService.getRoleByRoleId(RoleEnum.MEMBER.id()).orElse(null);
        } else {
            role = roleService.getRoleByRoleUuid(form.getRoleUuid()).orElse(null);
        }

        if (role == null) {
            errors.rejectValue("roleUuid", RoleErrorConstants.RoleNotFound);
        }else{
            form.setRole(role);
        }
    }
}
