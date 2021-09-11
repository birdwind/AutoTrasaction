package com.birdwind.springBootInit.base.view.grid.abstracts;

import com.birdwind.springBootInit.base.dto.mapper.column.Header;
import com.birdwind.springBootInit.base.view.BaseRow;
import com.birdwind.springBootInit.base.view.grid.BaseGrid;
import java.util.Collection;
import java.util.Map;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public abstract class AbstractGrid implements BaseGrid {

    private Map<String, Header> header;

    private Collection<? extends BaseRow> contents;

}