package com.birdwind.autoTransaction.view.transaction;

import com.birdwind.autoTransaction.base.annotation.DateTimeFormatter;
import com.birdwind.autoTransaction.base.annotation.PropertyMap;
import com.birdwind.autoTransaction.base.annotation.Search;
import com.birdwind.autoTransaction.base.annotation.ViewType;
import com.birdwind.autoTransaction.base.enums.DateTimeFormatType;
import com.birdwind.autoTransaction.base.enums.FieldType;
import com.birdwind.autoTransaction.base.enums.ViewTypeEnum;
import com.birdwind.autoTransaction.base.view.grid.abstracts.AbstractRow;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class TransactionPageGridRow extends AbstractRow {

    private static final long serialVersionUID = 1L;

    @Search(type = FieldType.DATE)
    @DateTimeFormatter(value = DateTimeFormatType.DATE)
    private String transactionDate;

    @ViewType(both = ViewTypeEnum.HIDDEN)
    private String transactionUuid;

    @Search(type = FieldType.BOOLEAN)
    private String type;

    @Search
    @PropertyMap("currency.currencyName")
    private String currency;

    @Search
    private String quantity;

    @Search
    private String price;

    @Search
    private String total;

}
