package com.birdwind.autoTransaction.base.dto.mapper.provider;

import java.lang.reflect.Field;
import java.util.Optional;

public interface StringColumnProvider<S> extends ValueProvider<S> {

    static String cast(Object value) {
        return Optional.ofNullable(value).map(Object::toString).orElse("");
    }

    String provide(final S source, final Field targetField);

}
