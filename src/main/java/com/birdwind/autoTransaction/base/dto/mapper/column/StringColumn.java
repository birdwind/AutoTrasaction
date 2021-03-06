package com.birdwind.autoTransaction.base.dto.mapper.column;

public interface StringColumn extends Column {

    static StringColumn getInstance() {
        return new StringColumnImpl();
    }

    String getValue();

    void setValue(String value);

}
