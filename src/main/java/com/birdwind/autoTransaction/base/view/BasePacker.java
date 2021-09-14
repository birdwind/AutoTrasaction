package com.birdwind.autoTransaction.base.view;

import org.springframework.http.HttpStatus;
import java.util.Collection;

public interface BasePacker<R extends BaseResource> {

    R getInstance();

    R pack();

    R pack(Integer errorCode, String errorMsg);

    <V extends BaseView> R pack(V view);

    <V extends BaseView> R pack(V view, Integer errorCode, String errorMsg);

    <V extends BaseView> R pack(Collection<V> views);

    <V extends BaseView> R pack(Collection<V> views, Integer errorCode, String errorMsg);

    R packErrors();

    R packErrors(HttpStatus httpStatus);

    R packErrors(HttpStatus httpStatus, String response);

    R packErrors(HttpStatus httpStatus, Integer errorCode, String errorMsg);

    R packErrors(HttpStatus httpStatus, String response, Integer errorCode, String errorMsg);

    R packErrors(String url, HttpStatus httpStatus, String response, Integer errorCode, String errorMsg);

    R packFieldErrors(Collection<? extends BaseFieldError> errors, Integer errorCode, String errorMsg);

    R packNotFoundErrors(String response);

}
