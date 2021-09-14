package com.birdwind.autoTransaction.entity.service;

import com.birdwind.autoTransaction.entity.model.Function;
import java.util.List;

public interface FunctionService {

    List<Function> getFunctionsByModuleId(Integer moduleId);

}
