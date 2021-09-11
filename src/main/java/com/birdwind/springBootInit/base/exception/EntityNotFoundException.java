package com.birdwind.springBootInit.base.exception;

import org.apache.commons.lang3.StringUtils;
import org.springframework.http.HttpStatus;
import lombok.Getter;

@Getter
public class EntityNotFoundException extends BaseThrowable {

    private String field = "";

    private String value = "";

    private String code = "";

    public EntityNotFoundException() {
        super("entity not found");
    }

    public EntityNotFoundException(String field, String code) {
        super("entity not found");

        this.field = field;
        this.code = code;
    }

    public EntityNotFoundException(String field, String value, String code) {
        super("entity not found");

        this.field = field;
        this.value = value;
        this.code = code;
    }

    @Override
    public Object getType() {
        return StringUtils.EMPTY;
    }

    @Override
    public HttpStatus getHttpStatus() {
        return HttpStatus.NOT_FOUND;
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
