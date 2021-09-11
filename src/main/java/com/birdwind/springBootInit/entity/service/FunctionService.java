package com.birdwind.springBootInit.entity.service;

import com.birdwind.springBootInit.entity.model.Function;
import java.util.List;

public interface FunctionService {

    List<Function> getFunctionsByModuleId(Integer moduleId);

}
