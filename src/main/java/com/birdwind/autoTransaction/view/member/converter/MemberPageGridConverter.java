package com.birdwind.autoTransaction.view.member.converter;

import com.birdwind.autoTransaction.base.view.grid.abstracts.AbstractPageGridConverter;
import com.birdwind.autoTransaction.entity.model.Member;
import com.birdwind.autoTransaction.view.member.MemberPageGrid;
import com.birdwind.autoTransaction.view.member.MemberPageGridRow;
import org.springframework.stereotype.Component;

@Component
public class MemberPageGridConverter extends AbstractPageGridConverter<Member, MemberPageGridRow, MemberPageGrid> {
    @Override
    public MemberPageGridRow convert(Member source) {
        return complexMapping(source, MemberPageGridRow.class);
    }
}
