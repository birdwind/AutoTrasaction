package com.birdwind.autoTransaction.enums;

import com.birdwind.autoTransaction.base.enums.BaseEnum;
import com.google.common.collect.Maps;
import org.apache.commons.lang3.StringUtils;
import java.io.Serializable;
import java.util.Map;
import java.util.Optional;

public enum RoleEnum implements BaseEnum {
    SUPER_ADMIN(0, "SUPER_ADMIN"), ADMIN(2, "ADMIN"), MEMBER(3, "MEMBER");

    RoleEnum(int id, String value){
        this.id = id;
        this.value = value;
    }

    private static Map<Integer, RoleEnum> map;

    private int id;

    private String value;

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

        return map.values().stream().filter(m -> StringUtils.equals(name, m.value)).map(RoleEnum::id).findFirst()
                .orElse(null);
    }

    private static void init() {
        map = Maps.newHashMap();

        for (RoleEnum roleEnum : values()) {
            map.put(roleEnum.id, roleEnum);
        }
    }

    public Integer id() {
        return this.id;
    }

    public String value() {
        return this.value;
    }

    @Override
    public Serializable valueOf() {
        return this.id;
    }

    @Override
    public String valueOfName() {
        return this.value;
    }
}
