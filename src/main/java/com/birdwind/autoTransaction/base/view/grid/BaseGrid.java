package com.birdwind.autoTransaction.base.view.grid;

import com.birdwind.autoTransaction.base.dto.mapper.column.Header;
import com.birdwind.autoTransaction.base.view.BaseRow;
import java.util.Collection;
import java.util.Map;

public interface BaseGrid {

    Map<String, Header> getHeader();

    void setHeader(Map<String, Header> header);

    Collection<? extends BaseRow> getContents();

    void setContents(Collection<? extends BaseRow> contents);
}
