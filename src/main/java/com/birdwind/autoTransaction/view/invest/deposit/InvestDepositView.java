package com.birdwind.autoTransaction.view.invest.deposit;

import com.birdwind.autoTransaction.base.annotation.PropertyMap;
import com.birdwind.autoTransaction.base.annotation.Required;
import com.birdwind.autoTransaction.base.annotation.ViewType;
import com.birdwind.autoTransaction.base.dto.mapper.column.DateStringColumn;
import com.birdwind.autoTransaction.base.dto.mapper.column.NumberColumn;
import com.birdwind.autoTransaction.base.dto.mapper.column.StringColumn;
import com.birdwind.autoTransaction.base.enums.ViewTypeEnum;
import com.birdwind.autoTransaction.base.view.abstracts.AbstractView;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class InvestDepositView extends AbstractView {

    private static final long serialVersionUID = 1L;

    @ViewType(both = ViewTypeEnum.HIDDEN)
    private String investUuid;

    @ViewType(both = ViewTypeEnum.LABEL)
    private StringColumn investNo;

    @Required
    @ViewType(create = ViewTypeEnum.DROP_DOWN, update = ViewTypeEnum.LABEL)
    private StringColumn memberUuid;

    @Required
    @ViewType(both = ViewTypeEnum.FLOAT)
    private NumberColumn amount;

    @ViewType(both = ViewTypeEnum.TEXT)
    private StringColumn amountNote;

    @Required
    @ViewType(create = ViewTypeEnum.DROP_DOWN, update = ViewTypeEnum.LABEL)
    @PropertyMap(value = "investType.investTypeKey")
    private StringColumn investTypeUuid;

    @Required
    @ViewType(both = ViewTypeEnum.DATE)
    private DateStringColumn investDate;

}
