package com.birdwind.springBootInit.base.dto.mapper.column.converter;

import com.birdwind.springBootInit.base.dto.mapper.provider.StringColumnProvider;
import org.springframework.stereotype.Component;
import java.lang.reflect.Field;

@Component(value = "stringColumnConverterImpl")
final class StringColumnConverterImpl<S> implements StringColumnConverter<S>, StringColumnProvider<S> {
    @Override
    public StringColumnProvider<S> getProvider() {
        return this;
    }

    @Override
    public String provide(S source, Field targetField) {
        return StringColumnProvider.cast(get(source, targetField));
    }
}
