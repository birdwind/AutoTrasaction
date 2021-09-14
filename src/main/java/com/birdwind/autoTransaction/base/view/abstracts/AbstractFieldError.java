package com.birdwind.autoTransaction.base.view.abstracts;

import com.birdwind.autoTransaction.base.view.BaseFieldError;
import java.io.Serializable;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public abstract class AbstractFieldError implements BaseFieldError {

    private static final long serialVersionUID = 1L;

    private Serializable rejectedValue;

    private String defaultMessage;

    private String code;

    private String field;

}
