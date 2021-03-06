package com.birdwind.autoTransaction.view.member;

import com.birdwind.autoTransaction.base.annotation.ViewType;
import com.birdwind.autoTransaction.base.dto.mapper.column.StringColumn;
import com.birdwind.autoTransaction.base.enums.ViewTypeEnum;
import com.birdwind.autoTransaction.base.view.abstracts.AbstractView;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class MemberView extends AbstractView {

    private static final long serialVersionUID = 1L;

    @ViewType(both = ViewTypeEnum.HIDDEN)
    private String memberUuid;

    @ViewType(both = ViewTypeEnum.LABEL)
    private StringColumn memberNo;

    @ViewType(create = ViewTypeEnum.TEXT, update = ViewTypeEnum.LABEL)
    private StringColumn name;

    @ViewType(both = ViewTypeEnum.LABEL)
    private StringColumn nickname;
}
