package com.birdwind.autoTransaction.base.aop;

import com.birdwind.autoTransaction.base.exception.EntityNotFoundException;
import com.birdwind.autoTransaction.base.utils.ServletUtils;
import com.birdwind.autoTransaction.base.view.BaseForm;
import com.birdwind.autoTransaction.base.view.VoidForm;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Pointcut;
import org.aspectj.lang.reflect.MethodSignature;
import org.springframework.validation.BeanPropertyBindingResult;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.MethodArgumentNotValidException;
import java.lang.reflect.ParameterizedType;
import java.lang.reflect.Type;
import java.util.Arrays;

@Aspect
abstract class AbstractAuthFormAspect<C extends BaseForm, U extends BaseForm, D extends BaseForm> {

    private Class<C> createFromClazz;

    private Class<U> updateFromClazz;

    private Class<D> deleteFromClazz;

    private boolean isCreate = false;

    private boolean isUpdate = false;

    private boolean isDelete = false;

    AbstractAuthFormAspect() {
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
            updateFromClazz = null;
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

    @Pointcut("within(@org.springframework.web.bind.annotation.RestController *)")
    private void controller() {}

    @Pointcut("execution(* *(@com.birdwind.autoTransaction.base.annotation.AuthForm (*), ..)) || "
        + "execution(* *(.., @com.birdwind.autoTransaction.base.annotation.AuthForm (*), ..)) || "
        + "execution(* *(.., @com.birdwind.autoTransaction.base.annotation.AuthForm (*)))")
    private void annotation() {}

    @Pointcut("controller() && annotation()")
    protected final void pointCut() {}

    @SuppressWarnings({"ConstantConditions", "unchecked"})
    @Around("pointCut()")
    protected final Object doAround(ProceedingJoinPoint joinPoint) throws Throwable {
        Object[] args = joinPoint.getArgs();

        if (shouldNotPassed(joinPoint)) {
            return joinPoint.proceed(args);
        }

        MethodSignature methodSignature = (MethodSignature) joinPoint.getSignature();
        String[] names = methodSignature.getParameterNames();
        BindingResult newErrors = null;
        Class<?> clazz = null;

        if (isCreate) {
            clazz = createFromClazz;
        }
        if (isUpdate) {
            clazz = updateFromClazz;
        }
        if (isDelete) {
            clazz = deleteFromClazz;
        }

        for (int i = 0; i < args.length; i++) {
            Object arg = args[i];
            if (clazz.isAssignableFrom(arg.getClass())) {
                try {
                    newErrors = new BeanPropertyBindingResult(arg, names[i]);

                    if (isCreate) {
                        putAuthenticate((C) arg, newErrors);
                    } else if (isUpdate) {
                        postAuthenticate((U) arg, newErrors);
                    } else if (isDelete) {
                        deleteAuthenticate((D) arg, newErrors);
                    }

                    if (newErrors.hasErrors()) {
                        throw new MethodArgumentNotValidException(null, newErrors);
                    }
                } catch (EntityNotFoundException e) {
                    newErrors.rejectValue(e.getField(), e.getCode());
                    throw new MethodArgumentNotValidException(null, newErrors);
                }
            }
        }

        return joinPoint.proceed(args);
    }

    protected abstract void putAuthenticate(C form, BindingResult errors) throws EntityNotFoundException;

    protected abstract void postAuthenticate(U form, BindingResult errors) throws EntityNotFoundException;

    protected abstract void deleteAuthenticate(D form, BindingResult errors) throws EntityNotFoundException;

    private boolean shouldNotPassed(ProceedingJoinPoint joinPoint) {
        Object[] args = joinPoint.getArgs();

        requestMethod();

        if (isCreate && createFromClazz == null) {
            return true;
        }
        if (isUpdate && updateFromClazz == null) {
            return true;
        }
        if (isDelete && deleteFromClazz == null) {
            return true;
        }

        return Arrays.stream(args).noneMatch(arg -> {
            if (isCreate) {
                return createFromClazz.isAssignableFrom(arg.getClass());
            }
            if (isUpdate) {
                return updateFromClazz.isAssignableFrom(arg.getClass());
            }
            if (isDelete) {
                return deleteFromClazz.isAssignableFrom(arg.getClass());
            }
            return true;
        });
    }

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
