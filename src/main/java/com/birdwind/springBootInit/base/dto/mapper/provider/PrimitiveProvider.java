/*
 * Copyright (c) 2019. Create by Terry Huang (黃昭維)
 */

package com.birdwind.springBootInit.base.dto.mapper.provider;

import java.io.Serializable;
import java.lang.reflect.Field;

public interface PrimitiveProvider<S> extends ValueProvider<S> {

    static Serializable cast(Object value) {
        return (Serializable) value;
    }

    @Override
    Serializable provide(final S source, final Field targetField);

}
