package com.birdwind.springBootInit.base.exception;

import org.springframework.http.HttpStatus;

public abstract class BaseThrowable extends Throwable {

    private static final long serialVersionUID = 1L;

    public BaseThrowable(String message) {
        super(message);
    }

    public BaseThrowable(Throwable throwable) {
        super(throwable.getMessage(), throwable);
    }

    public abstract Object getType();

    public abstract HttpStatus getHttpStatus();

}
