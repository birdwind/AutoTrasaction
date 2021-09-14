package com.birdwind.autoTransaction.entity.service;

import com.birdwind.autoTransaction.entity.model.Module;
import java.util.List;

public interface ModuleService {

    List<Module> getModulesByMemberId(Integer memberId);

}
