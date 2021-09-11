package com.birdwind.springBootInit.view.member.converter;

import com.birdwind.springBootInit.base.view.converter.AbstractFormConverter;
import com.birdwind.springBootInit.entity.model.Member;
import com.birdwind.springBootInit.entity.service.MemberService;
import com.birdwind.springBootInit.view.member.MemberCreateForm;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import java.util.Locale;
import java.util.UUID;

@Component
public class MemberCreateFormConverter extends AbstractFormConverter<MemberCreateForm, Member> {

    @Autowired
    private MemberService memberService;

    @Override
    public Member convert(MemberCreateForm source) {
        Member target = simpleMapping(source, new Member());
        String memberNo = memberService.generateMemberNo();
        target.setMemberNo(memberNo);
        target.setUsername(memberNo.toLowerCase(Locale.ROOT));
        target.encodePasssword(memberNo);
        target.setMemberUuid(UUID.randomUUID().toString());
        return target;
    }
}
