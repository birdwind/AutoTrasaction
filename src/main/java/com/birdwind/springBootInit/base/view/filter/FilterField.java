package com.birdwind.springBootInit.base.view.filter;

import com.birdwind.springBootInit.base.enums.FilterOperator;
import com.birdwind.springBootInit.base.view.abstracts.AbstractForm;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public final class FilterField extends AbstractForm {

    @NotBlank
    private String field;

    @NotNull
    private Object value;

    private FilterOperator operator;

    private boolean ignoreCase;

    private FilterField() {
        this.operator = FilterOperator.eq;
        this.ignoreCase = false;
    }

    public FilterField(String field, Object value) {
        this();
        this.field = field;
        this.value = value;
    }

    public FilterField(String field, FilterOperator operator, Object value) {
        this(field, value);
        this.operator = operator;
    }

}
