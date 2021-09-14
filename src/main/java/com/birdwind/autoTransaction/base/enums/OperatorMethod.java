package com.birdwind.autoTransaction.base.enums;

import com.google.common.collect.Maps;
import org.apache.commons.lang3.StringUtils;
import java.io.Serializable;
import java.util.Map;
import java.util.Optional;

public enum OperatorMethod implements BaseEnum {

    READ(0, "GET"), CREATE(1, "PUT"), UPDATE(2, "POST"), DELETE(3, "DELETE");

    private static Map<Integer, OperatorMethod> map;

    private Integer key;

    private String value;

    OperatorMethod(Integer key, String value) {
        this.key = key;
        this.value = value;
    }

    public static String getName(Integer key) {
        if (map == null) {
            init();
        }

        return Optional.ofNullable(map.get(key)).map(m -> m.value).orElse(StringUtils.EMPTY);
    }

    public static Integer getKey(String name) {
        if (map == null) {
            init();
        }

        return map.values().stream().filter(m -> StringUtils.equals(name, m.value)).map(OperatorMethod::key).findFirst()
            .orElse(null);
    }

    private static void init() {
        map = Maps.newHashMap();

        for (OperatorMethod operatorMethod : values()) {
            map.put(operatorMethod.key, operatorMethod);
        }
    }

    public Integer key() {
        return this.key;
    }

    public String value() {
        return this.value;
    }

    public Boolean equals(String method) {
        return StringUtils.equals(method, this.value);
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
