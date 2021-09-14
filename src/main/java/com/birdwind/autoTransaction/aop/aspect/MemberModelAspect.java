package com.birdwind.autoTransaction.aop.aspect;

import com.birdwind.autoTransaction.base.aop.AbstractAuthModelAspect;
import com.birdwind.autoTransaction.base.exception.EntityNotFoundException;
import com.birdwind.autoTransaction.constans.MemberErrorConstantsEnums;
import com.birdwind.autoTransaction.entity.model.Member;
import com.birdwind.autoTransaction.entity.service.MemberService;
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
