package com.birdwind.springBootInit.base.system.converter;

import com.birdwind.springBootInit.base.dto.mapper.provider.PrimitiveProvider;
import com.birdwind.springBootInit.base.view.converter.AbstractViewConverter;
import com.birdwind.springBootInit.entity.model.Member;
import com.birdwind.springBootInit.entity.service.ModuleService;
import com.birdwind.springBootInit.view.module.converter.ModuleViewConverter;
import com.birdwind.springBootInit.base.system.ModuleAuthView;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class ModuleAuthViewConverter extends AbstractViewConverter<Member, ModuleAuthView> {

    @Autowired
    private ModuleService moduleService;

    @Autowired
    private ModuleViewConverter moduleViewConverter;

    private PrimitiveProvider<Member> modulesProvider = (source, field) -> PrimitiveProvider
        .cast(moduleViewConverter.convert(moduleService.getModulesByMemberId(source.getMemberId())));

    @Override
    public ModuleAuthView convert(Member source) {
        addValueProvider("modules", modulesProvider);
        return complexMapping(source, ModuleAuthView.class);
    }

}
