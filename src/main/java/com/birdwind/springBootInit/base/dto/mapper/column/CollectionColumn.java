package com.birdwind.springBootInit.base.dto.mapper.column;

import java.util.Collection;

public interface CollectionColumn extends Column {

    static CollectionColumn getInstance() {
        return new CollectionColumnImpl();
    }

    Collection<?> getValue();

    void setValue(Collection<?> value);
}
