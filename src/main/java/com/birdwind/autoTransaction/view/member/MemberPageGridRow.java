package com.birdwind.autoTransaction.view.member;

import com.birdwind.autoTransaction.base.annotation.ViewType;
import com.birdwind.autoTransaction.base.enums.ViewTypeEnum;
import com.birdwind.autoTransaction.base.view.grid.abstracts.AbstractRow;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class MemberPageGridRow extends AbstractRow {

    @ViewType(both = ViewTypeEnum.HIDDEN)
    private String memberUuid;

    private String memberNo;

    private String name;

    @ViewType(both = ViewTypeEnum.HIDDEN)
    private String createDate;
}
