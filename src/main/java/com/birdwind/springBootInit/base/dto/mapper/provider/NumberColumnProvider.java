/*
 * Copyright (c) 2019. Create by Terry Huang (黃昭維)
 */

package com.birdwind.springBootInit.base.dto.mapper.provider;

import java.lang.reflect.Field;
import java.util.Optional;

public interface NumberColumnProvider<S> extends ValueProvider<S> {

    static Number cast(Object value) {
        try {
            return Optional.ofNullable(value).map(v -> {
                if (v.getClass() == Boolean.class || v.getClass() == boolean.class) {
                    return (Boolean) value ? 1 : 0;
                }
                return (Number) value;
            }).orElse(null);
        } catch (ClassCastException e) {
            return null;
        }
    }

    @Override
    Number provide(final S source, final Field targetField);

}
