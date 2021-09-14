package com.birdwind.autoTransaction.base.annotation;

import com.birdwind.autoTransaction.base.enums.FieldType;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Target(ElementType.FIELD)
@Retention(RetentionPolicy.RUNTIME)
public @interface Search {

    FieldType type() default FieldType.STRING;

}