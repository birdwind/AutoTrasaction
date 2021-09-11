package com.birdwind.springBootInit.base.validator;

import com.birdwind.springBootInit.base.view.BaseForm;
import com.birdwind.springBootInit.base.view.VoidForm;
import org.springframework.validation.BindingResult;
import java.lang.reflect.ParameterizedType;
import java.lang.reflect.Type;

public abstract class CreateFormValidator<C extends BaseForm> extends AbstractFormValidator<C, VoidForm, VoidForm> {

    @SuppressWarnings("unchecked")
    protected final void init() {
        Type[] types = (((ParameterizedType) getClass().getGenericSuperclass()).getActualTypeArguments());

        setCreateFromClazz((Class<C>) types[0]);
        setUpdateFromClazz(null);
        setDeleteFromClazz(null);
    }

    @Override
    protected abstract void putValidate(C form, BindingResult errors);

    @Override
    protected final void postValidate(VoidForm form, BindingResult errors) {

    }

    @Override
    protected final void deleteValidate(VoidForm form, BindingResult errors) {

    }

}
