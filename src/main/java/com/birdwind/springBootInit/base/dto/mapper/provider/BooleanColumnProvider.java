package com.birdwind.springBootInit.base.dto.mapper.provider;

import java.lang.reflect.Field;
import java.util.Optional;

public interface BooleanColumnProvider<S> extends ValueProvider<S> {

    static Boolean cast(Object value) {
        try {
            return Optional.ofNullable(value).map(Boolean.class::cast).orElse(null);
        } catch (ClassCastException e) {
            return null;
        }
    }

    @Override
    Boolean provide(final S source, final Field targetField);

}
