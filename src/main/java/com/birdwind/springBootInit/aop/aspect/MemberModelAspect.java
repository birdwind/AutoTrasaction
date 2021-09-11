package com.birdwind.springBootInit.aop.aspect;

import com.birdwind.springBootInit.base.aop.AbstractAuthModelAspect;
import com.birdwind.springBootInit.base.exception.EntityNotFoundException;
import com.birdwind.springBootInit.constans.MemberErrorConstantsEnums;
import com.birdwind.springBootInit.entity.model.Member;
import com.birdwind.springBootInit.entity.service.MemberService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class MemberModelAspect extends AbstractAuthModelAspect<Member> {

    @Autowired
    private MemberService memberService;

    @Override
    protected Member authenticate(String source) throws Throwable {
        return memberService.getMemberByMemberUuid(source).orElseThrow(
            () -> new EntityNotFoundException("memberUuid", MemberErrorConstantsEnums.MEMBER_LOGIN_NOT_FOUND.valueOfName()));
    }
}
