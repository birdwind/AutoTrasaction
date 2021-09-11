package com.birdwind.springBootInit.base.enums;

import java.io.Serializable;
import java.util.Map;
import java.util.Optional;

import org.apache.commons.lang3.StringUtils;

import com.birdwind.springBootInit.base.constans.BaseErrorConstants;
import com.google.common.collect.Maps;

public enum ErrorCode implements BaseEnum {
    SUCCESS(0, "Success"), NO_PERMISSION(1, BaseErrorConstants.NO_PERMISSION), NOT_LOGIN(2,
        BaseErrorConstants.NOT_LOGIN), RESOURCE_NOTFOUND(3, BaseErrorConstants.RESOURCE_NOT_FOUND), API_NOT_FOUND(4,
            BaseErrorConstants.API_NOT_FOUND), BAD_REQUEST(5, BaseErrorConstants.BAD_REQUEST), DATA_INCOMPLETE(6,
                BaseErrorConstants.DATA_INCOMPLETE), SERVER_ERROR(7, BaseErrorConstants.SERVER_ERROR), LOGIN_ERROR(8,
                    BaseErrorConstants.LOGIN_ERROR), EXPIRED_SESSION(9, BaseErrorConstants.EXPIRED_SESSION), FIELD_MISS(
                        10, BaseErrorConstants.FIELD_MISS), SPECIAL_ERROR(11, BaseErrorConstants.SPECIAL_ERROR);

    private static Map<Integer, ErrorCode> map;

    private Integer key;

    private String value;

    ErrorCode(Integer key, String value) {
        this.key = key;
        this.value = value;
    }

    public static String getErrorMsg(Integer key) {
        if (map == null) {
            init();
        }

        return Optional.ofNullable(map.get(key)).map(m -> m.value).orElse(StringUtils.EMPTY);
    }

    public static Integer getErrorCode(String errorMsg) {
        if (map == null) {
            init();
        }

        return map.values().stream().filter(m -> StringUtils.equals(errorMsg, m.value)).map(ErrorCode::errorCode)
            .findFirst().orElse(null);
    }

    private static void init() {
        map = Maps.newHashMap();

        for (ErrorCode errorCode : values()) {
            map.put(errorCode.key, errorCode);
        }
    }

    public Integer errorCode() {
        return this.key;
    }

    public String errorMsg() {
        return this.value;
    }

    @Override
    public Serializable valueOf() {
        return this.key;
    }

    @Override
    public String valueOfName() {
        return this.value;
    }
}
