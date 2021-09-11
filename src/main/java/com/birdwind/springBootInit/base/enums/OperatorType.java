package com.birdwind.springBootInit.base.enums;

import com.google.common.collect.Maps;
import org.apache.commons.lang3.StringUtils;
import java.io.Serializable;
import java.util.Map;
import java.util.Optional;

public enum OperatorType implements BaseEnum {

    PAGE(0, "page"), API(1, "api");

    private static Map<Integer, OperatorType> map;

    private Integer key;

    private String value;

    OperatorType(Integer key, String value) {
        this.key = key;
        this.value = value;
    }

    public static String getUrl(Integer key) {
        if (map == null) {
            init();
        }

        return Optional.ofNullable(map.get(key)).map(m -> "/" + m.value).orElse(StringUtils.EMPTY);
    }

    private static void init() {
        map = Maps.newHashMap();

        for (OperatorType operatorType : values()) {
            map.put(operatorType.key, operatorType);
        }
    }

    public Integer key() {
        return this.key;
    }

    public String value() {
        return this.value;
    }

    public String url() {
        return "/" + this.value;
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
