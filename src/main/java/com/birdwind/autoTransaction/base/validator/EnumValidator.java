package com.birdwind.autoTransaction.base.validator;

import com.birdwind.autoTransaction.base.annotation.Enum;
import com.birdwind.autoTransaction.base.enums.BaseEnum;
import java.util.Arrays;
import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

public class EnumValidator implements ConstraintValidator<Enum, Object> {

    private boolean nullable;

    private Class<? extends BaseEnum> enumClass;

    @Override
    public void initialize(Enum constraintAnnotation) {
        // nothing to do
        nullable = constraintAnnotation.nullable();
        enumClass = constraintAnnotation.enumClass();
    }

    @Override
    public boolean isValid(Object value, ConstraintValidatorContext constraintValidatorContext) {
        BaseEnum[] enumConstants = enumClass.getEnumConstants();

        if (!nullable && value == null) {
            return false;
        }

        if (nullable && value == null) {
            return true;
        }

        if (value instanceof Integer) {
            return Arrays.stream(enumConstants).anyMatch(c -> c.valueOf() == value);
        } else if (value instanceof String) {
            return Arrays.stream(enumConstants).anyMatch(c -> c.valueOfName().equals(value));
        }

        return false;
    }

}
