/*
 * Copyright (c) 2019. Create by Terry Huang (黃昭維)
 */

package com.birdwind.autoTransaction.base.dto.basic;

import com.google.common.collect.Lists;
import org.springframework.util.CollectionUtils;
import java.util.Collection;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@FunctionalInterface
public interface BaseConverter<S, T> {

    T convert(S source);

    default List<T> convert(Collection<S> sources) {
        return CollectionUtils.isEmpty(sources) ? Lists.newArrayList()
            : sources.stream().filter(Objects::nonNull).map(this::convert).filter(Objects::nonNull)
                .collect(Collectors.toList());
    }

}
