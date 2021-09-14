package com.birdwind.autoTransaction.view.transaction;

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
