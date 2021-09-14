package com.birdwind.autoTransaction.base.view.abstracts;

import com.google.gson.Gson;
import com.birdwind.autoTransaction.base.view.BaseResource;
import java.io.Serializable;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public abstract class AbstractResource implements BaseResource {

    private static final long serialVersionUID = 1L;

    private String apiVersion;

    private Boolean status;

    private Integer errorCode;

    private String errorMsg;

    private Integer httpStatus;

    private String requestUrl;

    private String method;

    private String resourceName;

    private String timeStamp;

    private Serializable response;

    private Serializable responseError;

    private Serializable responseFieldError;

    public String toJson() {
        Gson gson = new Gson();
        return gson.toJson(this);
    }
}
