package com.birdwind.springBootInit.view.module.converter;

import com.birdwind.springBootInit.base.dto.mapper.provider.PrimitiveProvider;
import com.birdwind.springBootInit.base.utils.LocaleI18nUtils;
import com.birdwind.springBootInit.base.view.converter.AbstractViewConverter;
import com.birdwind.springBootInit.entity.model.Module;
import com.birdwind.springBootInit.entity.service.FunctionService;
import com.birdwind.springBootInit.view.function.converter.FunctionViewConverter;
import com.birdwind.springBootInit.view.module.ModuleView;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class ModuleViewConverter extends AbstractViewConverter<Module, ModuleView> {

    private final PrimitiveProvider<Module> moduleValueProvider =
        (source, field) -> LocaleI18nUtils.getString(source.getModuleValue());

    @Autowired
    private FunctionService functionService;

    @Autowired
    private FunctionViewConverter functionViewConverter;

    private final PrimitiveProvider<Module> functionProvider = (source, field) -> PrimitiveProvider
        .cast(functionViewConverter.convert(functionService.getFunctionsByModuleId(source.getModuleId())));

    @Override
    public ModuleView convert(Module source) {
        addValueProvider("moduleValue", moduleValueProvider);
        addValueProvider("function", functionProvider);

        return complexMapping(source, ModuleView.class);
    }

}
