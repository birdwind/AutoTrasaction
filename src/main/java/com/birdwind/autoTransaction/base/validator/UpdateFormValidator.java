package com.birdwind.autoTransaction.base.validator;

import com.birdwind.autoTransaction.base.view.BaseForm;
import com.birdwind.autoTransaction.base.view.VoidForm;
import org.springframework.validation.BindingResult;
import java.lang.reflect.ParameterizedType;
import java.lang.reflect.Type;

public abstract class UpdateFormValidator<U extends BaseForm> extends AbstractFormValidator<VoidForm, U, VoidForm> {

    @SuppressWarnings("unchecked")
    protected final void init() {
        Type[] types = (((ParameterizedType) getClass().getGenericSuperclass()).getActualTypeArguments());

        setCreateFromClazz(null);
        setUpdateFromClazz((Class<U>) types[0]);
        setDeleteFromClazz(null);
    }

    @Override
    protected final void putValidate(VoidForm form, BindingResult errors) {

    }

    @Override
    protected abstract void postValidate(U form, BindingResult errors);

    @Override
    protected final void deleteValidate(VoidForm form, BindingResult errors) {

    }

}
