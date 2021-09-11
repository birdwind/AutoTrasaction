package com.birdwind.springBootInit.view.transaction;

import com.birdwind.springBootInit.base.annotation.PropertyMap;
import com.birdwind.springBootInit.base.annotation.Required;
import com.birdwind.springBootInit.base.annotation.ViewType;
import com.birdwind.springBootInit.base.dto.mapper.column.BooleanColumn;
import com.birdwind.springBootInit.base.dto.mapper.column.DateStringColumn;
import com.birdwind.springBootInit.base.dto.mapper.column.NumberColumn;
import com.birdwind.springBootInit.base.dto.mapper.column.StringColumn;
import com.birdwind.springBootInit.base.enums.ViewTypeEnum;
import com.birdwind.springBootInit.base.view.abstracts.AbstractView;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class TransactionView extends AbstractView {

    private static final long serialVersionUID = 1L;

    @ViewType(both = ViewTypeEnum.HIDDEN)
    private String transactionUuid;

    @ViewType(both = ViewTypeEnum.LABEL)
    private StringColumn transactionNo;

    @Required
    @ViewType(create = ViewTypeEnum.DROP_DOWN, update = ViewTypeEnum.LABEL)
    private StringColumn type;

    @Required
    @ViewType(update = ViewTypeEnum.LABEL)
    @PropertyMap("currency.currencyName")
    private StringColumn currencyName;

    @Required
    @ViewType(create = ViewTypeEnum.FLOAT, update = ViewTypeEnum.LABEL)
    private NumberColumn price;

    @Required
    @ViewType(create = ViewTypeEnum.FLOAT, update = ViewTypeEnum.LABEL)
    private NumberColumn quantity;

    @Required
    @ViewType(both = ViewTypeEnum.DATE)
    private DateStringColumn transactionDate;

}
