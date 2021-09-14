package com.birdwind.autoTransaction.base.dto.mapper.column;

public interface BooleanColumn extends Column {

    static BooleanColumn getInstance() {
        return new BooleanColumnImpl();
    }

    Boolean getValue();

    void setValue(Boolean value);
}
