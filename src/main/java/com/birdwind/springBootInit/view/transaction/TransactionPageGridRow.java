package com.birdwind.springBootInit.view.transaction;

import com.birdwind.springBootInit.base.annotation.DateTimeFormatter;
import com.birdwind.springBootInit.base.annotation.PropertyMap;
import com.birdwind.springBootInit.base.annotation.Search;
import com.birdwind.springBootInit.base.annotation.ViewType;
import com.birdwind.springBootInit.base.enums.DateTimeFormatType;
import com.birdwind.springBootInit.base.enums.FieldType;
import com.birdwind.springBootInit.base.enums.ViewTypeEnum;
import com.birdwind.springBootInit.base.view.grid.abstracts.AbstractRow;
import java.math.BigDecimal;
import java.util.Date;
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
