package com.birdwind.springBootInit.base.exception;

public class AccessResourceException extends RuntimeException {

    private static final long serialVersionUID = 1L;

    public AccessResourceException(String message) {
        super(message);
    }

    public AccessResourceException(Throwable throwable) {
        super(throwable.getMessage(), throwable);
    }

}
