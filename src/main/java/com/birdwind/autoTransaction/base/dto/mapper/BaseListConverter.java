package com.birdwind.autoTransaction.base.dto.mapper;

import com.birdwind.autoTransaction.base.dto.basic.BaseConverter;
import com.birdwind.autoTransaction.base.repo.BaseModel;
import com.birdwind.autoTransaction.base.view.BaseListItem;
import java.io.Serializable;

public interface BaseListConverter<S extends BaseModel, L extends BaseListItem> extends BaseConverter<S, L> {

    Serializable getText(S source);

    Serializable getValue(S source);

    void setOtherProperty(L item, S source);

}
