package com.birdwind.autoTransaction.base.dto.mapper.column.converter;

import com.birdwind.autoTransaction.base.dto.mapper.provider.CollectionColumnProvider;
import org.springframework.stereotype.Component;
import java.lang.reflect.Field;
import java.util.Collection;

@Component(value = "collectionColumnConverterImpl")
final class CollectionColumnConverterImpl<S> implements CollectionColumnConverter<S>, CollectionColumnProvider<S> {

    @Override
    public CollectionColumnProvider<S> getProvider() {
        return this;
    }

    @Override
    public Collection<?> provide(S source, Field targetField) {
        return CollectionColumnProvider.cast(get(source, targetField));
    }
}
