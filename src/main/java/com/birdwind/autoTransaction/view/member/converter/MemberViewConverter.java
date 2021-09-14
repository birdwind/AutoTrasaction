package com.birdwind.autoTransaction.view.member.converter;

import com.birdwind.autoTransaction.base.view.converter.AbstractViewConverter;
import com.birdwind.autoTransaction.entity.model.Member;
import com.birdwind.autoTransaction.view.member.MemberView;
import org.springframework.stereotype.Component;

@Component
public class MemberViewConverter extends AbstractViewConverter<Member, MemberView> {
    @Override
    public MemberView convert(Member source) {
        return complexMapping(source, MemberView.class);
    }
}
