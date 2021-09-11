package com.birdwind.springBootInit.base.validator;

import com.birdwind.springBootInit.base.view.BaseForm;
import com.birdwind.springBootInit.base.view.VoidForm;
import org.springframework.validation.BindingResult;
import java.lang.reflect.ParameterizedType;
import java.lang.reflect.Type;

public abstract class DeleteFormValidator<D extends BaseForm> extends AbstractFormValidator<VoidForm, VoidForm, D> {

    @SuppressWarnings("unchecked")
    protected final void init() {
        Type[] types = (((ParameterizedType) getClass().getGenericSuperclass()).getActualTypeArguments());

        setCreateFromClazz(null);
        setUpdateFromClazz(null);
        setDeleteFromClazz((Class<D>) types[0]);
    }

    @Override
    protected final void putValidate(VoidForm form, BindingResult errors) {

    }

    @Override
    protected final void postValidate(VoidForm form, BindingResult errors) {

    }

    @Override
    protected abstract void deleteValidate(D form, BindingResult errors);

}
