package com.birdwind.springBootInit.view.function.converter;

import com.birdwind.springBootInit.base.dto.mapper.provider.PrimitiveProvider;
import com.birdwind.springBootInit.base.enums.OperatorType;
import com.birdwind.springBootInit.base.utils.LocaleI18nUtils;
import com.birdwind.springBootInit.base.view.converter.AbstractViewConverter;
import com.birdwind.springBootInit.entity.model.Function;
import com.birdwind.springBootInit.view.function.FunctionView;
import org.springframework.stereotype.Component;

@Component
public class FunctionViewConverter extends AbstractViewConverter<Function, FunctionView> {

    private final PrimitiveProvider<Function> backUrlProvider =
        (source, field) -> OperatorType.PAGE.url() + source.getBackUrl();

    private final PrimitiveProvider<Function> functionValueProvider =
        (source, field) -> LocaleI18nUtils.getString(source.getFunctionValue());

    @Override
    public FunctionView convert(Function source) {
        addValueProvider("backUrl", backUrlProvider);
        addValueProvider("functionValue", functionValueProvider);

        return complexMapping(source, FunctionView.class);
    }
}
