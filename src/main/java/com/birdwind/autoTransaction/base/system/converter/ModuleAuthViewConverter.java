package com.birdwind.autoTransaction.base.system.converter;

import com.birdwind.autoTransaction.base.dto.mapper.provider.PrimitiveProvider;
import com.birdwind.autoTransaction.base.view.converter.AbstractViewConverter;
import com.birdwind.autoTransaction.entity.model.Member;
import com.birdwind.autoTransaction.entity.service.ModuleService;
import com.birdwind.autoTransaction.view.module.converter.ModuleViewConverter;
import com.birdwind.autoTransaction.base.system.ModuleAuthView;
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
