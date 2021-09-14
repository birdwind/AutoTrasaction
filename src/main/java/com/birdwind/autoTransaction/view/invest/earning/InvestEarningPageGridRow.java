package com.birdwind.autoTransaction.view.invest.earning;

import com.birdwind.autoTransaction.base.annotation.PropertyMap;
import com.birdwind.autoTransaction.base.annotation.Search;
import com.birdwind.autoTransaction.base.annotation.ViewType;
import com.birdwind.autoTransaction.base.enums.ViewTypeEnum;
import com.birdwind.autoTransaction.base.view.grid.abstracts.AbstractRow;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
public class InvestEarningPageGridRow extends AbstractRow {

    private static final long serialVersionUID = 1L;

    @ViewType(both = ViewTypeEnum.HIDDEN)
    private String memberUuid;

    @Search
    @PropertyMap("name")
    private String member;

    @Search
    private BigDecimal total;

    @Search
    private String totalPercent;

    @Search
    private BigDecimal earning;

    @Search
    private String earningPercent;
}
