package com.birdwind.springBootInit.entity.service;

import com.birdwind.springBootInit.entity.model.FunctionOperatorRelate;
import java.util.Collection;
import java.util.List;

public interface FunctionOperatorRelateService {

    List<FunctionOperatorRelate> getFunctionOperatorRelatesByFunctionIds(Collection<Integer> functionIds);

}
