package com.birdwind.springBootInit.base.annotation;

import com.birdwind.springBootInit.base.enums.ViewTypeEnum;
import com.birdwind.springBootInit.base.repo.BaseModel;
import org.apache.commons.lang3.StringUtils;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Target(ElementType.FIELD)
@Retention(RetentionPolicy.RUNTIME)
public @interface ViewType {

    Class<? extends BaseModel> prefix() default BaseModel.class;

    String value() default StringUtils.EMPTY;

    ViewTypeEnum create() default ViewTypeEnum.TEXT;

    ViewTypeEnum update() default ViewTypeEnum.TEXT;

    ViewTypeEnum both() default ViewTypeEnum.DEFAULT;

}
