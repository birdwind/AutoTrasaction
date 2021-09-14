/*
 * Copyright (c) 2019. Create by Terry Huang (黃昭維)
 */

package com.birdwind.autoTransaction.base.dto.mapper.column;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.birdwind.autoTransaction.base.view.BaseListItem;
import java.util.List;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
final class HeaderImpl implements Header {

    private String title;

    private String type;

    private Boolean required;

    @JsonInclude(JsonInclude.Include.NON_NULL)
    private String search;

    @JsonInclude(JsonInclude.Include.NON_NULL)
    private List<? extends BaseListItem> keyValue;

    HeaderImpl() {
        super();
    }

    HeaderImpl(String title, String type, Boolean required, List<? extends BaseListItem> keyValue, String search) {
        super();
        this.title = title;
        this.type = type;
        this.required = required;
        this.keyValue = keyValue;
        this.search = search;
    }

}
