package com.birdwind.springBootInit.base.exception;

public class PageNotFoundException extends RuntimeException {

    private static final long serialVersionUID = 1L;

    public PageNotFoundException(String message) {
        super(message);
    }

    public PageNotFoundException(Throwable throwable) {
        super(throwable.getMessage(), throwable);
    }

}
