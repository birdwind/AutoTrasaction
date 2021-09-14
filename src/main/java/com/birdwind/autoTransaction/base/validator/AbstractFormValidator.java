package com.birdwind.autoTransaction.base.validator;

import com.birdwind.autoTransaction.base.utils.ServletUtils;
import com.birdwind.autoTransaction.base.view.BaseForm;
import com.birdwind.autoTransaction.base.view.VoidForm;
import org.springframework.lang.NonNull;
import org.springframework.validation.BindingResult;
import org.springframework.validation.Errors;
import org.springframework.validation.Validator;
import java.lang.reflect.ParameterizedType;
import java.lang.reflect.Type;

abstract class AbstractFormValidator<C extends BaseForm, U extends BaseForm, D extends BaseForm> implements Validator {

    private Class<C> createFromClazz;

    private Class<U> updateFromClazz;

    private Class<D> deleteFromClazz;

    private boolean isCreate = false;

    private boolean isUpdate = false;

    private boolean isDelete = false;

    AbstractFormValidator() {
        init();
    }

    void setCreateFromClazz(Class<C> clazz) {
        if (clazz == VoidForm.class) {
            createFromClazz = null;
        }

        createFromClazz = clazz;
    }

    void setUpdateFromClazz(Class<U> clazz) {
        if (clazz == VoidForm.class) {
            updateFromClazz = null;
        }

        updateFromClazz = clazz;
    }

    void setDeleteFromClazz(Class<D> clazz) {
        if (clazz == VoidForm.class) {
            deleteFromClazz = null;
        }

        deleteFromClazz = clazz;
    }

    @SuppressWarnings("unchecked")
    protected void init() {
        Type[] types = (((ParameterizedType) getClass().getGenericSuperclass()).getActualTypeArguments());

        setCreateFromClazz((Class<C>) types[0]);
        setUpdateFromClazz((Class<U>) types[1]);
        setDeleteFromClazz((Class<D>) types[2]);
    }

    @Override
    public boolean supports(@NonNull Class<?> clazz) {
        requestMethod();
        return true;
    }

    @Override
    @SuppressWarnings("unchecked")
    public final void validate(@NonNull Object target, @NonNull Errors errors) {
        if (errors.hasErrors()) {
            return;
        }

        if (isCreate && createFromClazz != null) {
            putValidate((C) target, (BindingResult) errors);
        } else if (isUpdate && updateFromClazz != null) {
            postValidate((U) target, (BindingResult) errors);
        } else if (isDelete && deleteFromClazz != null) {
            deleteValidate((D) target, (BindingResult) errors);
        }
    }

    protected abstract void putValidate(C form, BindingResult errors);

    protected abstract void postValidate(U form, BindingResult errors);

    protected abstract void deleteValidate(D form, BindingResult errors);

    private void requestMethod() {
        if (ServletUtils.isCreate()) {
            isCreate = true;
            isUpdate = false;
            isDelete = false;
        } else if (ServletUtils.isUpdate()) {
            isCreate = false;
            isUpdate = true;
            isDelete = false;
        } else if (ServletUtils.isDelete()) {
            isCreate = false;
            isUpdate = false;
            isDelete = true;
        }
    }

}
