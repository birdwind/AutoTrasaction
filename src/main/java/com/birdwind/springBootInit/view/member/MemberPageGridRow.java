package com.birdwind.springBootInit.view.member;

import com.birdwind.springBootInit.base.annotation.PropertyMap;
import com.birdwind.springBootInit.base.annotation.ViewType;
import com.birdwind.springBootInit.base.enums.ViewTypeEnum;
import com.birdwind.springBootInit.base.view.grid.abstracts.AbstractRow;
import java.math.BigDecimal;
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