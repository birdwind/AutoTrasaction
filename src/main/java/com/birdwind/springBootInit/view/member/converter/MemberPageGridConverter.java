package com.birdwind.springBootInit.view.member.converter;

import com.birdwind.springBootInit.base.view.grid.abstracts.AbstractPageGridConverter;
import com.birdwind.springBootInit.entity.model.Member;
import com.birdwind.springBootInit.view.member.MemberPageGrid;
import com.birdwind.springBootInit.view.member.MemberPageGridRow;
import org.springframework.stereotype.Component;

@Component
public class MemberPageGridConverter extends AbstractPageGridConverter<Member, MemberPageGridRow, MemberPageGrid> {
    @Override
    public MemberPageGridRow convert(Member source) {
        return complexMapping(source, MemberPageGridRow.class);
    }
}
