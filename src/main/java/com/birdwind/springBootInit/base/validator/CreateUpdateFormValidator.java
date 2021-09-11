package com.birdwind.springBootInit.base.validator;

import com.birdwind.springBootInit.base.view.BaseForm;
import com.birdwind.springBootInit.base.view.VoidForm;
import org.springframework.validation.BindingResult;
import java.lang.reflect.ParameterizedType;
import java.lang.reflect.Type;

public abstract class CreateUpdateFormValidator<C extends BaseForm, U extends BaseForm>
    extends AbstractFormValidator<C, U, VoidForm> {

    @SuppressWarnings("unchecked")
    protected final void init() {
        Type[] types = (((ParameterizedType) getClass().getGenericSuperclass()).getActualTypeArguments());

        setCreateFromClazz((Class<C>) types[0]);
        setUpdateFromClazz((Class<U>) types[1]);
        setDeleteFromClazz(null);
    }

    @Override
    protected abstract void putValidate(C form, BindingResult errors);

    @Override
    protected abstract void postValidate(U form, BindingResult errors);

    @Override
    protected final void deleteValidate(VoidForm form, BindingResult errors) {

    }

}
