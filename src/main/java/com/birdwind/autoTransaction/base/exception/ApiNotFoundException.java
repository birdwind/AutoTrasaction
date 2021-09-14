package com.birdwind.autoTransaction.base.exception;

public class ApiNotFoundException extends RuntimeException {

    private static final long serialVersionUID = 1L;

    public ApiNotFoundException(String message) {
        super(message);
    }

    public ApiNotFoundException(Throwable throwable) {
        super(throwable.getMessage(), throwable);
    }

}
