package com.birdwind.autoTransaction.base.dto.mapper.column.converter;

import com.birdwind.autoTransaction.base.dto.mapper.column.NumberColumn;
import com.birdwind.autoTransaction.base.dto.mapper.provider.NumberColumnProvider;
import java.lang.reflect.Field;

public interface NumberColumnConverter<S> extends ColumnConverter<S, NumberColumn> {

    @Override
    NumberColumnProvider<S> getProvider();

    @Override
    default NumberColumn apply(S s, Field field){
        NumberColumn numberColumn = NumberColumn.getInstance();
        numberColumn.setValue(getProvider().provide(s, field));
        return numberColumn;
    };
}
