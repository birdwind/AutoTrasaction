package com.birdwind.springBootInit.entity.service.impl;

import com.birdwind.springBootInit.base.security.model.CheckAuthority;
import com.birdwind.springBootInit.entity.dao.FunctionOperatorRelateDao;
import com.birdwind.springBootInit.entity.model.FunctionOperatorRelate;
import com.birdwind.springBootInit.entity.service.FunctionOperatorRelateService;
import com.google.common.collect.Lists;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.Collection;
import java.util.List;
import javax.transaction.Transactional;

@Service
@Transactional
public class FunctionOperatorRelateServiceImpl implements FunctionOperatorRelateService {

    @Autowired
    private FunctionOperatorRelateDao functionOperatorRelateDao;

    @Override
    public List<FunctionOperatorRelate> getFunctionOperatorRelatesByFunctionIds(Collection<Integer> functionIds) {
        if (functionIds.isEmpty())
            return Lists.newArrayList();

        return CheckAuthority.isSuperAdmin()
            ? functionOperatorRelateDao.findAllFunctionOperatorRelatesByFunctionIds(functionIds)
                .orElse(Lists.newArrayList())
            : functionOperatorRelateDao.findFunctionOperatorRelatesByFunctionIds(functionIds)
                .orElse(Lists.newArrayList());
    }

}
