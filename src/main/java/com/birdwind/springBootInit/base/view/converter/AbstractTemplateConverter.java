package com.birdwind.springBootInit.base.view.converter;

import com.birdwind.springBootInit.base.annotation.SubView;
import com.birdwind.springBootInit.base.view.BaseTemplate;
import com.birdwind.springBootInit.base.view.grid.abstracts.AbstractGrid;
import com.birdwind.springBootInit.base.view.grid.abstracts.AbstractPageGrid;
import com.google.common.collect.Lists;
import com.google.common.collect.Maps;
import org.apache.commons.lang3.StringUtils;
import org.apache.commons.lang3.reflect.MethodUtils;
import java.lang.reflect.Field;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Modifier;
import java.lang.reflect.ParameterizedType;
import java.util.Collection;
import java.util.LinkedHashMap;
import java.util.LinkedList;
import java.util.List;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public abstract class AbstractTemplateConverter<T extends BaseTemplate> {
    private final String suffix = "-collection";

    private Class<T> clazz;

    @SuppressWarnings("unchecked")
    public AbstractTemplateConverter() {
        this.clazz = (Class<T>) (((ParameterizedType) getClass().getGenericSuperclass()).getActualTypeArguments()[0]);
    }

    public T convert(Object... views) {
        T template;

        try {
            template = clazz.getDeclaredConstructor().newInstance();
        } catch (IllegalAccessException | InstantiationException | NoSuchMethodException
                | InvocationTargetException e) {
            return null;
        }

        LinkedHashMap<String, Object> map = Maps.newLinkedHashMap();

        for (Object view : views) {
            if (view == null) {
                continue;
            }

            if (view instanceof Collection<?>) {
                ((Collection<?>) view).stream().findFirst().map(v -> v.getClass().getSimpleName())
                        .ifPresent(n -> map.put(n + suffix, view));
            } else {
                String key = view.getClass().getSimpleName();
                map.put(key, objectToMap(view));
            }
        }

        mapToTemplate(template, map);

        return template;
    }

    private void mapToTemplate(T template, LinkedHashMap<String, Object> map) {
        for (Field field : template.getClass().getDeclaredFields()) {
            if (field.isAnnotationPresent(SubView.class)) {
                SubView subView = field.getDeclaredAnnotation(SubView.class);

                if (subView.singlton()) {
                    singleMap(field, template, map, subView);
                } else {
                    multiMap(field, template, map, subView);
                }
            }
        }
    }

    @SuppressWarnings("unchecked")
    private void singleMap(Field field, T template, LinkedHashMap<String, Object> map, SubView subView) {
        LinkedHashMap<String, Object> source = (LinkedHashMap<String, Object>) map.get(subView.view().getSimpleName());

        if (source == null) {
            return;
        }

        try {
            removeOrAddField(source, subView.field(), subView.except());
            MethodUtils.invokeMethod(template, "set" + StringUtils.capitalize(field.getName()), source);
        } catch (NoSuchMethodException | IllegalAccessException | InvocationTargetException e) {
            // do nothing if invoked failed
        }
    }

    private void multiMap(Field field, T template, LinkedHashMap<String, Object> map, SubView subView) {
        String key = subView.view().getSimpleName() + suffix;

        Collection<?> source = (Collection<?>) map.get(key);

        if (source == null) {
            return;
        }

        if (source.isEmpty()) {
            // singleMap(field, template, map, subView);
            source = (Collection<?>) map.get(subView.view().getSimpleName());
        }

        LinkedList<LinkedHashMap<String, Object>> target = Lists.newLinkedList();

        source.forEach(s -> {
            LinkedHashMap<String, Object> m = objectToMap(s);
            removeOrAddField(m, subView.field(), subView.except());
            target.add(m);
        });

        try {
            MethodUtils.invokeMethod(template, "set" + StringUtils.capitalize(field.getName()), target);
        } catch (NoSuchMethodException | IllegalAccessException | InvocationTargetException e) {
            // do nothing if invoked failed
        }
    }

    private void removeOrAddField(LinkedHashMap<String, Object> map, String[] fields, String[] excepts) {
        List<String> fieldList = Lists.newArrayList(fields);
        List<String> exceptList = Lists.newArrayList(excepts);

        if (!fieldList.isEmpty()) {
            map.entrySet().removeIf(e -> !fieldList.contains(e.getKey()));
        } else {
            map.entrySet().removeIf(e -> exceptList.contains(e.getKey()));
        }
    }

    private LinkedHashMap<String, Object> objectToMap(Object obj) {
        if (obj == null) {
            return null;
        }

        LinkedHashMap<String, Object> map = Maps.newLinkedHashMap();
        Class<?> clazz = obj.getClass();

        if (obj.getClass().getSuperclass().equals(AbstractGrid.class)
                || obj.getClass().getSuperclass().equals(AbstractPageGrid.class)) {
            clazz = clazz.getSuperclass();
        }

        for (Field field : clazz.getDeclaredFields()) {
            if (Modifier.isStatic(field.getModifiers())) {
                continue;
            }

            field.setAccessible(true);

            try {
                map.put(field.getName(), field.get(obj));
            } catch (IllegalAccessException e) {
                // do nothing if illegal access
            }
        }

        return map;
    }

}
