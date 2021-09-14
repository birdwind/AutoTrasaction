package com.birdwind.autoTransaction.base.exception;

import org.apache.commons.lang3.StringUtils;
import org.springframework.http.HttpStatus;
import lombok.Getter;

@Getter
public class RelateNotMatchException extends BaseThrowable {

    private String field = "";

    private String value = "";

    private String code = "";

    public RelateNotMatchException() {
        super("relate not match");
    }

    public RelateNotMatchException(String field, String code) {
        super("relate not match");

        this.field = field;
        this.code = code;
    }

    @Override
    public Object getType() {
        return StringUtils.EMPTY;
    }

    @Override
    public HttpStatus getHttpStatus() {
        return HttpStatus.PRECONDITION_FAILED;
    }

    @Override
    public String getMessage() {
        //TODO: I18n多國語言處理
        if (StringUtils.isBlank(this.value)) {
//            return this.field + " : " + LocaleI18nUtils.getString(this.code);
            return this.field + " : " + this.code;
        }

//        return this.field + " = " + this.value + " : " + LocaleI18nUtils.getString(this.code);
        return this.field + " = " + this.value + " : " + this.code;
    }

}
