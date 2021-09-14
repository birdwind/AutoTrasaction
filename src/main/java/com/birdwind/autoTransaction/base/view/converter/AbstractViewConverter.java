package com.birdwind.autoTransaction.base.view.converter;

import java.io.Serializable;
import java.lang.reflect.Field;
import java.lang.reflect.Modifier;
import java.lang.reflect.ParameterizedType;
import java.util.Arrays;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;

import com.birdwind.autoTransaction.base.annotation.Ignore;
import com.birdwind.autoTransaction.base.dto.basic.ComplexConverter;
import com.birdwind.autoTransaction.base.dto.basic.SimpleConverter;
import com.birdwind.autoTransaction.base.dto.mapper.HeaderConverter;
import com.birdwind.autoTransaction.base.dto.mapper.column.BooleanColumn;
import com.birdwind.autoTransaction.base.dto.mapper.column.CollectionColumn;
import com.birdwind.autoTransaction.base.dto.mapper.column.Column;
import com.birdwind.autoTransaction.base.dto.mapper.column.DateStringColumn;
import com.birdwind.autoTransaction.base.dto.mapper.column.NumberColumn;
import com.birdwind.autoTransaction.base.dto.mapper.column.StringColumn;
import com.birdwind.autoTransaction.base.dto.mapper.column.converter.BooleanColumnConverter;
import com.birdwind.autoTransaction.base.dto.mapper.column.converter.CollectionColumnConverter;
import com.birdwind.autoTransaction.base.dto.mapper.column.converter.ColumnConverter;
import com.birdwind.autoTransaction.base.dto.mapper.column.converter.DateStringColumnConverter;
import com.birdwind.autoTransaction.base.dto.mapper.column.converter.NumberColumnConverter;
import com.birdwind.autoTransaction.base.dto.mapper.column.converter.PrimitiveColumnConverter;
import com.birdwind.autoTransaction.base.dto.mapper.column.converter.StringColumnConverter;
import com.birdwind.autoTransaction.base.dto.mapper.provider.ValueProvider;
import com.birdwind.autoTransaction.base.enums.ViewTypeEnum;
import com.birdwind.autoTransaction.base.repo.BaseModel;
import com.birdwind.autoTransaction.base.utils.LocaleI18nUtils;
import com.birdwind.autoTransaction.base.view.BaseView;
import com.google.common.collect.Maps;
import lombok.Getter;

public abstract class AbstractViewConverter<S extends BaseModel, T extends BaseView>
    implements SimpleConverter<S, T>, ComplexConverter<S, T>, HeaderConverter {

    private static final ViewTypeEnum DEFAULT_VIEW_TYPE = ViewTypeEnum.TEXT;

    private static final Boolean DEFAULT_REQUIRED = false;

    @Getter
    private boolean isCreate = false;

    @Getter
    private String prefix;

    private Map<String, ViewTypeEnum> viewTypeEnumMap = Maps.newHashMap();

    private Map<String, Boolean> requiredMap = Maps.newHashMap();

    private Map<String, ValueProvider<S>> valueProviderMap = Maps.newHashMap();

    @Autowired
    @Qualifier(value = "stringColumnConverterImpl")
    private ColumnConverter<S, StringColumn> stringColumnConverter;

    @Autowired
    @Qualifier(value = "dateStringColumnConverterImpl")
    private ColumnConverter<S, DateStringColumn> dateStringColumnConverter;

    @Autowired
    @Qualifier(value = "numberColumnConverterImpl")
    private ColumnConverter<S, NumberColumn> numberColumnConverter;

    @Autowired
    @Qualifier(value = "collectionColumnConverterImpl")
    private ColumnConverter<S, CollectionColumn> collectionColumnConverter;

    @Autowired
    @Qualifier(value = "primitiveColumnConverterImpl")
    private ColumnConverter<S, Serializable> primitiveColumnConverter;

    @Autowired
    @Qualifier(value = "booleanColumnConverterImpl")
    private ColumnConverter<S, BooleanColumn> booleanColumnConverter;

    @SuppressWarnings("unchecked")
    public AbstractViewConverter() {
        Class<S> clazz =
            ((Class<S>) ((ParameterizedType) getClass().getGenericSuperclass()).getActualTypeArguments()[0]);

        this.prefix = LocaleI18nUtils.getI18nPrefix(clazz);
    }

    @Override
    public final T complexMapping(S source, Class<T> targetClass) {
        try {
            isCreate = source.isCreate();
            T target = targetClass.getDeclaredConstructor().newInstance();
            doComplexMapping(source, target);
            return target;
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    @Override
    public final T complexMapping(S source, T target) {
        try {
            isCreate = source.isCreate();
            doComplexMapping(source, target);
            return target;
        } catch (Exception e) {
            return null;
        }
    }

    @Override
    public ViewTypeEnum getDefaultViewType() {
        return DEFAULT_VIEW_TYPE;
    }

    @Override
    public Boolean getDefaultRequired() {
        return DEFAULT_REQUIRED;
    }

    protected void addTypeProvider(String name, ViewTypeEnum viewTypeEnum) {
        viewTypeEnumMap.put(name, viewTypeEnum);
    }

    protected void addTypeProvider(ViewTypeEnum viewTypeEnum, String... names) {
        for (String n : names) {
            viewTypeEnumMap.put(n, viewTypeEnum);
        }
    }

    protected void addRequiredProvider(String name, Boolean required) {
        requiredMap.put(name, required);
    }

    protected void addRequiredProvider(Boolean required, String... names) {
        for (String n : names) {
            requiredMap.put(n, required);
        }
    }

    protected void addValueProvider(String name, ValueProvider<S> provider) {
        valueProviderMap.put(name, provider);
    }

    private void setTitle(Field field, Column column) {
        if (column.getTitle() != null) {
            column.setTitle(LocaleI18nUtils.getString(column.getTitle()));
            return;
        }

        column.setTitle(getTitle(field));
    }

    private void setType(Field field, Column column) {
        if (column.getType() != null) {
            return;
        }

        if (viewTypeEnumMap.get(field.getName()) != null) {
            column.setType(viewTypeEnumMap.get(field.getName()).value());
            return;
        }

        column.setType(getType(field));
    }

    private void setRequired(Field field, Column column) {
        if (column.getRequired() != null) {
            return;
        }

        if (requiredMap.get(field.getName()) != null) {
            column.setRequired(requiredMap.get(field.getName()));
            return;
        }

        column.setRequired(getRequired(field));
    }

    private void setKeyValue(Field field, Column column) {
        if (column.getKeyValue() != null) {
            return;
        }

        column.setKeyValue(getKeyValue(field));
    }

//    private void setSearch(Field field, Column column) {
//        column.setSearch(getSearch(field));
//    }

    private void doComplexMapping(S source, T target) {
        Arrays.stream(target.getClass().getDeclaredFields())
            .filter(field -> !Modifier.isStatic(field.getModifiers()) && !field.isAnnotationPresent(Ignore.class))
            .forEach(field -> {
                ColumnConverter<S, ?> columnConverter = getColumnConverter(field);
                set(target, field, columnConverter.convert(source, field));
            });

        clear();
    }

    private ColumnConverter<S, ?> getColumnConverter(Field field) {
        ValueProvider<S> provider = valueProviderMap.get(field.getName());

        if (field.getType() == StringColumn.class) {
            return provider == null ? stringColumnConverter : (StringColumnConverter<S>) provider::cast;
        } else if (field.getType() == NumberColumn.class) {
            return provider == null ? numberColumnConverter : (NumberColumnConverter<S>) provider::cast;
        } else if (field.getType() == DateStringColumn.class) {
            return provider == null ? dateStringColumnConverter : (DateStringColumnConverter<S>) provider::cast;
        } else if (field.getType() == CollectionColumn.class) {
            return provider == null ? collectionColumnConverter : (CollectionColumnConverter<S>) provider::cast;
        } else if (field.getType() == BooleanColumn.class) {
            return provider == null ? booleanColumnConverter : (BooleanColumnConverter<S>) provider::cast;
        } else {
            return provider == null ? primitiveColumnConverter : (PrimitiveColumnConverter<S>) provider::cast;
        }
    }

    private void set(T target, Field field, Serializable value) {
        if (value instanceof Column) {
            Column column = (Column) value;
            setTitle(field, column);
            setType(field, column);
            setRequired(field, column);
            setKeyValue(field, column);
            setValue(target, field, column);
        } else {
            setValue(target, field, value);
        }
    }

    private void clear() {
        viewTypeEnumMap.clear();
        requiredMap.clear();
        valueProviderMap.clear();
    }

    private void setValue(T target, Field field, Serializable value) {
        try {
            field.setAccessible(true);
            if (field.getType() == String.class && value != null) {
                field.set(target, value.toString());
            } else {
                field.set(target, value);
            }
        } catch (IllegalArgumentException | IllegalAccessException | ClassCastException e) {
            // do nothing
        }
    }

}
