package com.birdwind.autoTransaction.base.utils;

import com.birdwind.autoTransaction.base.annotation.I18nPrefix;
import com.google.common.collect.Maps;
import org.apache.commons.lang3.StringUtils;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.Optional;
import java.util.ResourceBundle;
import lombok.AccessLevel;
import lombok.NoArgsConstructor;

@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class LocaleI18nUtils {

    private static ResourceBundle resourceBundle = ResourceBundle.getBundle("messages", Locale.TRADITIONAL_CHINESE);

    public static String getString(String key) {
        try {
            return resourceBundle.getString(key);
        } catch (Exception exception) {
            return key;
        }
    }

    public static String getI18nPrefix(Class<?> clazz) {
        return Optional.ofNullable(clazz.getDeclaredAnnotation(I18nPrefix.class)).map(i18n -> i18n.value() + ".")
            .orElse(StringUtils.EMPTY);
    }

    public static Map<String, Object> getMessageMap(String titleKey, List<Object> value, Integer required) {
        Map<String, Object> result = Maps.newHashMap();

        result.put("title", LocaleI18nUtils.getString(titleKey));
        result.put("required", required);
        result.put("value", value.get(0));

        return result;
    }
}
