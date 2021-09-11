package com.birdwind.springBootInit.base.validator;

import com.birdwind.springBootInit.base.view.BaseForm;
import com.birdwind.springBootInit.base.view.VoidForm;
import org.springframework.validation.BindingResult;
import java.lang.reflect.ParameterizedType;
import java.lang.reflect.Type;

public abstract class UpdateDeleteFormValidator<U extends BaseForm, D extends BaseForm>
    extends AbstractFormValidator<VoidForm, U, D> {

    @SuppressWarnings("unchecked")
    protected final void init() {
        Type[] types = (((ParameterizedType) getClass().getGenericSuperclass()).getActualTypeArguments());

        setCreateFromClazz(null);
        setUpdateFromClazz((Class<U>) types[0]);
        setDeleteFromClazz((Class<D>) types[1]);
    }

    @Override
    protected final void putValidate(VoidForm form, BindingResult errors) {

    }

    @Override
    protected abstract void postValidate(U form, BindingResult errors);

    @Override
    protected abstract void deleteValidate(D form, BindingResult errors);

}
