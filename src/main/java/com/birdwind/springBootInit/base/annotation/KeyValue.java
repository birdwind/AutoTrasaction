package com.birdwind.springBootInit.base.annotation;

import com.birdwind.springBootInit.base.enums.BaseEnum;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Target(ElementType.FIELD)
@Retention(RetentionPolicy.RUNTIME)
public @interface KeyValue {

    Class<? extends BaseEnum> value();

}
