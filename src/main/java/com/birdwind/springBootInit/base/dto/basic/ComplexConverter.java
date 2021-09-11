/*
 * Copyright (c) 2019. Create by Terry Huang (黃昭維)
 */

package com.birdwind.springBootInit.base.dto.basic;

public interface ComplexConverter<S, T> extends BaseConverter<S, T> {

    T complexMapping(S source, Class<T> targetClass);

    T complexMapping(S source, T target);

}
