/*
 * Copyright (c) 2019. Create by Terry Huang (黃昭維)
 */

package com.birdwind.springBootInit.base.dto.mapper.provider;

import com.google.common.collect.Lists;
import java.lang.reflect.Field;
import java.util.Collection;
import java.util.Optional;

public interface CollectionColumnProvider<S> extends ValueProvider<S> {

    static Collection<?> cast(Object value) {
        return Optional.ofNullable(value).map(v -> {
            if (Collection.class.isAssignableFrom(v.getClass())) {
                return (Collection) v;
            } else {
                return Lists.newArrayList(v);
            }
        }).orElse(Lists.newArrayList());
    }

    @Override
    Collection<?> provide(final S source, final Field targetField);

}
