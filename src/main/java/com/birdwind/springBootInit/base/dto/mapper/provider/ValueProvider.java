package com.birdwind.springBootInit.base.dto.mapper.provider;

import com.birdwind.springBootInit.base.annotation.PropertyMap;
import org.apache.commons.lang3.StringUtils;
import org.hibernate.proxy.HibernateProxy;
import org.hibernate.proxy.LazyInitializer;
import java.lang.reflect.Field;
import java.util.Collection;
import java.util.Optional;
import java.util.stream.Collectors;

public interface ValueProvider<S> {

    Object provide(final S source, final Field targetField);

    @SuppressWarnings("unchecked")
    default <E> E cast() {
        try {
            return (E) this;
        } catch (ClassCastException e) {
            return null;
        }
    }

    default Object get(S source, final Field targetField) {
        PropertyMap propertyMap = targetField.getDeclaredAnnotation(PropertyMap.class);
        String[] fieldNames = Optional.ofNullable(propertyMap).map(PropertyMap::value)
            .map(value -> StringUtils.split(value, ".")).orElse(new String[] {targetField.getName()});
        Object object = source;

        for (final String fieldName : fieldNames) {
            object = unproxy(object);

            if (object == null) {
                break;
            } else if (Collection.class.isAssignableFrom(object.getClass())) {
                object = ((Collection<?>) object).stream().map(o -> unproxy(getValue(o, fieldName)))
                    .collect(Collectors.toList());
            } else {
                object = Optional.ofNullable(getValue(object, fieldName)).orElse(null);
            }
        }

        return object;
    }

    default <E> Object getValue(E source, String fieldName) {
        try {
            Field field = source.getClass().getDeclaredField(fieldName);
            field.setAccessible(true);
            return field.get(source);
        } catch (NullPointerException | NoSuchFieldException | IllegalAccessException e) {
            return null;
        }
    }

    default Object unproxy(Object proxy) {
        if (proxy instanceof HibernateProxy) {
            HibernateProxy hibernateProxy = (HibernateProxy) proxy;
            LazyInitializer initializer = hibernateProxy.getHibernateLazyInitializer();
            return initializer.getImplementation();
        } else {
            return proxy;
        }
    }

}
