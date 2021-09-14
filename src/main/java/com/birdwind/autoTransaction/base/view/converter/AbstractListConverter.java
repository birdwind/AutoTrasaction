package com.birdwind.autoTransaction.base.view.converter;

import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.ParameterizedType;
import java.lang.reflect.Type;

import com.birdwind.autoTransaction.base.dto.mapper.BaseListConverter;
import com.birdwind.autoTransaction.base.repo.BaseModel;
import com.birdwind.autoTransaction.base.view.abstracts.AbstractListItem;

public abstract class AbstractListConverter<S extends BaseModel, L extends AbstractListItem>
    implements BaseListConverter<S, L> {

    private Class<L> clazz;

    @SuppressWarnings("unchecked")
    public AbstractListConverter() {
        Type[] types = (((ParameterizedType) getClass().getGenericSuperclass()).getActualTypeArguments());
        this.clazz = (Class<L>) types[1];
    }

    @Override
    public final L convert(S source) {
        try {
            L target = clazz.getDeclaredConstructor().newInstance();

            target.setText(getText(source));
            target.setValue(getValue(source));
            setOtherProperty(target, source);

            return target;
        } catch (NoSuchMethodException | InvocationTargetException | InstantiationException
            | IllegalAccessException e) {
            return null;
        }
    }

}
