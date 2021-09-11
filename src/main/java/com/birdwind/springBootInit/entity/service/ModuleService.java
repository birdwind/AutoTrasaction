package com.birdwind.springBootInit.entity.service;

import com.birdwind.springBootInit.entity.model.Module;
import java.util.List;

public interface ModuleService {

    List<Module> getModulesByMemberId(Integer memberId);

}
