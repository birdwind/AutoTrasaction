package com.birdwind.springBootInit.base.aop;

import com.birdwind.springBootInit.base.exception.ApiNotFoundException;
import com.birdwind.springBootInit.base.exception.PageNotFoundException;
import com.birdwind.springBootInit.base.utils.ServletUtils;
import org.springframework.core.convert.converter.Converter;
import java.io.Serializable;
import java.util.Optional;
import javax.annotation.Nonnull;

public abstract class AbstractAuthModelAspect<T extends Serializable> implements Converter<String, T> {

    public AbstractAuthModelAspect() {}

    @Override
    public final T convert(@Nonnull String source) {
        try {
            T target = authenticate(source);
            assertNotNull(target, source);
            return target;
        } catch (Throwable e) {
            throw ServletUtils.isApi() ? new ApiNotFoundException(e) : new PageNotFoundException(e);
        }
    }

    protected abstract T authenticate(String source) throws Throwable;

    private void assertNotNull(T target, String source) {
        Optional.ofNullable(target).orElseThrow(() -> {
            String msg = source + " not found";
            return ServletUtils.isApi() ? new ApiNotFoundException(msg) : new PageNotFoundException(msg);
        });
    }

}
