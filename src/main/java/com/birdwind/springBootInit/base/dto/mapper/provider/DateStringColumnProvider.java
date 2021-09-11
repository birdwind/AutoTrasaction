/*
 * Copyright (c) 2019. Create by Terry Huang (黃昭維)
 */

package com.birdwind.springBootInit.base.dto.mapper.provider;

import java.lang.reflect.Field;
import java.util.Date;
import java.util.Optional;

public interface DateStringColumnProvider<S> extends ValueProvider<S> {

    static Date cast(Object value) {
        try {
            return Optional.ofNullable(value).map(Date.class::cast).orElse(null);
        } catch (ClassCastException e) {
            // can not cast to date
            return null;
        }
    }

    @Override
    Date provide(final S source, final Field targetField);

}
