package com.birdwind.springBootInit.base.aop;

import com.birdwind.springBootInit.base.exception.EntityNotFoundException;
import com.birdwind.springBootInit.base.view.BaseForm;
import com.birdwind.springBootInit.base.view.VoidForm;
import org.springframework.validation.BindingResult;
import java.lang.reflect.ParameterizedType;
import java.lang.reflect.Type;

public abstract class CreateFormAspect<C extends BaseForm> extends AbstractAuthFormAspect<C, VoidForm, VoidForm> {

    @SuppressWarnings("unchecked")
    protected final void init() {
        Type[] types = (((ParameterizedType) getClass().getGenericSuperclass()).getActualTypeArguments());

        setCreateFromClazz((Class<C>) types[0]);
        setUpdateFromClazz(null);
        setDeleteFromClazz(null);
    }

    @Override
    protected abstract void putAuthenticate(C form, BindingResult errors) throws EntityNotFoundException;

    @Override
    protected final void postAuthenticate(VoidForm form, BindingResult errors) throws EntityNotFoundException {

    }

    @Override
    protected final void deleteAuthenticate(VoidForm form, BindingResult errors) throws EntityNotFoundException {

    }

}
