package com.birdwind.springBootInit.base.view;

import java.io.Serializable;

public interface BaseFieldError extends BaseView {

    Serializable getRejectedValue();

    void setRejectedValue(Serializable rejectedValue);

    String getDefaultMessage();

    void setDefaultMessage(String defaultMessage);

    String getCode();

    void setCode(String code);

    String getField();

    void setField(String field);
}
