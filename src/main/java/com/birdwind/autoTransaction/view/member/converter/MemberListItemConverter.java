package com.birdwind.autoTransaction.view.member.converter;

import com.birdwind.autoTransaction.base.view.converter.AbstractListConverter;
import com.birdwind.autoTransaction.entity.model.Member;
import com.birdwind.autoTransaction.view.member.MemberListItem;
import org.springframework.stereotype.Component;
import java.io.Serializable;

@Component
public class MemberListItemConverter extends AbstractListConverter<Member, MemberListItem> {
    @Override
    public Serializable getText(Member source) {
        return source.getName();
    }

    @Override
    public Serializable getValue(Member source) {
        return source.getMemberUuid();
    }

    @Override
    public void setOtherProperty(MemberListItem item, Member source) {

    }
}
