package com.birdwind.autoTransaction.view.invest.deposit;

import com.birdwind.autoTransaction.base.annotation.DateTimeFormatter;
import com.birdwind.autoTransaction.base.annotation.Search;
import com.birdwind.autoTransaction.base.annotation.ViewType;
import com.birdwind.autoTransaction.base.enums.DateTimeFormatType;
import com.birdwind.autoTransaction.base.enums.FieldType;
import com.birdwind.autoTransaction.base.enums.ViewTypeEnum;
import com.birdwind.autoTransaction.base.view.grid.abstracts.AbstractRow;
import java.math.BigDecimal;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class InvestDepositPageGridRow extends AbstractRow {

    private static final long serialVersionUID = 1L;

    @ViewType(both = ViewTypeEnum.HIDDEN)
    private String investUuid;

    @Search
    private String member;

    @Search
    private String investNo;

    @Search
    private String investTypeUuid;

    @Search(type = FieldType.NUMBER)
    private BigDecimal amount;

    private String amountNote;

    @Search(type = FieldType.DATE)
    @DateTimeFormatter(value = DateTimeFormatType.DATE)
    private String investDate;

    @Search(type = FieldType.DATE)
    @ViewType(both = ViewTypeEnum.HIDDEN)
    private String createDate;

}
