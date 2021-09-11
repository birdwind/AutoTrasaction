package com.birdwind.springBootInit.entity.service.impl;

import com.birdwind.springBootInit.base.security.model.CheckAuthority;
import com.birdwind.springBootInit.entity.dao.ModuleDao;
import com.birdwind.springBootInit.entity.model.Module;
import com.birdwind.springBootInit.entity.service.ModuleService;
import com.google.common.collect.Lists;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import javax.transaction.Transactional;

@Service
@Transactional
public class ModuleServiceImpl implements ModuleService {

    @Autowired
    private ModuleDao moduleDao;

    @Override
    public List<Module> getModulesByMemberId(Integer memberId) {
        if (CheckAuthority.isSuperAdmin()) {
            return moduleDao.findAllModules().orElse(Lists.newArrayList());
        }

        return moduleDao.findModulesByMemberCoreId(memberId).orElse(Lists.newArrayList());
    }
}
