package com.birdwind.springBootInit.base.dto.mapper.column;


public interface DateStringColumn extends StringColumn{
    static DateStringColumn getInstance(){
        return new DateStringColumnImpl();
    }
}
