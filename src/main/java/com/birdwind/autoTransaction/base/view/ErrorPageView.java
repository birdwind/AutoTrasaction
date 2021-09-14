package com.birdwind.autoTransaction.base.view;

import com.birdwind.autoTransaction.base.exception.BaseThrowable;
import com.birdwind.autoTransaction.base.utils.LocaleI18nUtils;
import org.apache.commons.lang3.StringUtils;
import org.springframework.http.HttpStatus;
import java.io.Serializable;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ErrorPageView implements Serializable {

    private static final long serialVersionUID = 1L;

    private HttpStatus status;

    private Integer statusCode;

    private String errorMessage;

    private String requestUrl;

    public ErrorPageView(HttpStatus status, String requestUrl) {
        this(status, requestUrl, status.getReasonPhrase());
    }

    public ErrorPageView(HttpStatus status, String requestUrl, BaseThrowable cause) {
        this(status, requestUrl);

        if (cause != null) {
            this.errorMessage = cause.getMessage() + " " + LocaleI18nUtils.getString(cause.getType().toString());
        }
    }

    public ErrorPageView(HttpStatus status, String requestUrl, String errorMessage) {
        this.status = status;
        this.statusCode = status.value();
        if (StringUtils.isBlank(errorMessage)) {
            this.errorMessage = status.getReasonPhrase();
        } else {
            this.errorMessage = errorMessage;
        }
        this.requestUrl = requestUrl;
    }

}

