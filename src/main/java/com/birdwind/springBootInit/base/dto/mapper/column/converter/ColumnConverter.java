package com.birdwind.springBootInit.base.dto.mapper.column.converter;

import com.birdwind.springBootInit.base.dto.mapper.provider.ValueProvider;
import java.io.Serializable;
import java.lang.reflect.Field;
import java.util.function.BiFunction;

public interface ColumnConverter<S, C extends Serializable> extends BiFunction<S, Field, C> {

    default C convert(S source, Field field) {
        return apply(source, field);
    }

    ValueProvider<S> getProvider();

}
