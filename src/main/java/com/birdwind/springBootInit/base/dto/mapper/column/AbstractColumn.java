package com.birdwind.springBootInit.base.dto.mapper.column;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.birdwind.springBootInit.base.view.BaseListItem;
import java.util.List;
import lombok.Data;

@Data
abstract class AbstractColumn implements Column {

    private String title;

    private String type;

    private Boolean required;

    @JsonInclude(JsonInclude.Include.NON_NULL)
    private List<? extends BaseListItem> keyValue;

    @JsonInclude(JsonInclude.Include.NON_NULL)
    private String search;

}
