package com.birdwind.autoTransaction.base.annotation;

import org.apache.commons.lang3.StringUtils;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Target(ElementType.TYPE)
@Retention(RetentionPolicy.RUNTIME)
public @interface I18nPrefix {

    String value() default StringUtils.EMPTY;

}
