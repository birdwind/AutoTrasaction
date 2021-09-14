package com.birdwind.autoTransaction.entity.service;

import com.birdwind.autoTransaction.entity.model.FunctionOperatorRelate;
import java.util.Collection;
import java.util.List;

public interface FunctionOperatorRelateService {

    List<FunctionOperatorRelate> getFunctionOperatorRelatesByFunctionIds(Collection<Integer> functionIds);

}
