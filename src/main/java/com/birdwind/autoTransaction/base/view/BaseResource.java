package com.birdwind.autoTransaction.base.view;

import java.io.Serializable;

public interface BaseResource extends BaseView {

    String getApiVersion();

    void setApiVersion(String apiVersion);

    Boolean getStatus();

    void setStatus(Boolean status);

    Integer getErrorCode();

    void setErrorCode(Integer errorCode);

    String getErrorMsg();

    void setErrorMsg(String errorMsg);

    Integer getHttpStatus();

    void setHttpStatus(Integer httpStatus);

    String getRequestUrl();

    void setRequestUrl(String requestUrl);

    String getMethod();

    void setMethod(String method);

    String getResourceName();

    void setResourceName(String resourceName);

    String getTimeStamp();

    void setTimeStamp(String timeStamp);

    Serializable getResponse();

    void setResponse(Serializable response);

    Serializable getResponseError();

    void setResponseError(Serializable responseError);

    Serializable getResponseFieldError();

    void setResponseFieldError(Serializable responseFieldError);
}
