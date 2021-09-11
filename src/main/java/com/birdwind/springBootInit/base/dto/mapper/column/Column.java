package com.birdwind.springBootInit.base.dto.mapper.column;

import com.birdwind.springBootInit.base.view.BaseListItem;
import java.io.Serializable;
import java.util.List;

public interface Column extends Serializable {

    String getTitle();

    void setTitle(String title);

    String getType();

    void setType(String type);

    Boolean getRequired();

    void setRequired(Boolean required);

    List<? extends BaseListItem> getKeyValue();

    void setKeyValue(List<? extends BaseListItem> keyValue);

    String getSearch();

    void setSearch(String search);

}
