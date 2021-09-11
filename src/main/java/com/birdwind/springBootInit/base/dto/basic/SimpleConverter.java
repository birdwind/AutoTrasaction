package com.birdwind.springBootInit.base.dto.basic;

import com.birdwind.springBootInit.base.repo.AbstractModel;
import java.util.Date;
import ma.glasnost.orika.MapperFacade;
import ma.glasnost.orika.MapperFactory;
import ma.glasnost.orika.converter.builtin.PassThroughConverter;
import ma.glasnost.orika.impl.DefaultMapperFactory;

public interface SimpleConverter<S, T> extends BaseConverter<S, T> {

    default T simpleMapping(S source, Class<T> targetClass) {
        MapperFactory mapperFactory = new DefaultMapperFactory.Builder().build();
        mapperFactory.getConverterFactory().registerConverter(new PassThroughConverter(AbstractModel.class));
        mapperFactory.getConverterFactory().registerConverter(new PassThroughConverter(Date.class));
        mapperFactory.classMap(source.getClass(), targetClass).mapNulls(true).mapNullsInReverse(false).byDefault()
            .register();
        MapperFacade mapper = mapperFactory.getMapperFacade();
        return mapper.map(source, targetClass);
    }

    default T simpleMapping(S source, T target) {
        MapperFactory mapperFactory = new DefaultMapperFactory.Builder().build();
        mapperFactory.getConverterFactory().registerConverter(new PassThroughConverter(AbstractModel.class));
        mapperFactory.getConverterFactory().registerConverter(new PassThroughConverter(Date.class));
        mapperFactory.classMap(source.getClass(), target.getClass()).mapNulls(true).mapNullsInReverse(false).byDefault()
            .register();
        MapperFacade mapper = mapperFactory.getMapperFacade();
        mapper.map(source, target);
        return target;
    }

    default <S2, T2> T2 otherMapping(S2 source, T2 target) {
        MapperFactory mapperFactory = new DefaultMapperFactory.Builder().build();
        mapperFactory.getConverterFactory().registerConverter(new PassThroughConverter(AbstractModel.class));
        mapperFactory.getConverterFactory().registerConverter(new PassThroughConverter(Date.class));
        mapperFactory.classMap(source.getClass(), target.getClass()).mapNulls(true).mapNullsInReverse(false).byDefault()
            .register();
        MapperFacade mapper = mapperFactory.getMapperFacade();
        mapper.map(source, target);
        return target;
    }

}
