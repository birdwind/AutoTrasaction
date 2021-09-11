package com.birdwind.springBootInit.entity.service.impl;

import com.birdwind.springBootInit.base.security.model.CheckAuthority;
import com.birdwind.springBootInit.entity.dao.FunctionDao;
import com.birdwind.springBootInit.entity.model.Function;
import com.birdwind.springBootInit.entity.service.FunctionService;
import com.google.common.collect.Lists;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import javax.transaction.Transactional;

@Service
@Transactional
public class FunctionServiceImpl implements FunctionService {

    @Autowired
    private FunctionDao functionDao;

    @Override
    public List<Function> getFunctionsByModuleId(Integer moduleId) {
        return CheckAuthority.isSuperAdmin()
            ? functionDao.findAllFunctionsByModuleId(moduleId).orElse(Lists.newArrayList())
            : functionDao.findFunctionsByModuleId(moduleId).orElse(Lists.newArrayList());
    }
}
