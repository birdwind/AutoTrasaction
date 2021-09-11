package com.birdwind.springBootInit.view.member.converter;

import com.birdwind.springBootInit.base.view.converter.AbstractViewConverter;
import com.birdwind.springBootInit.entity.model.Member;
import com.birdwind.springBootInit.view.member.MemberView;
import org.springframework.stereotype.Component;

@Component
public class MemberViewConverter extends AbstractViewConverter<Member, MemberView> {
    @Override
    public MemberView convert(Member source) {
        return complexMapping(source, MemberView.class);
    }
}
