package com.birdwind.autoTransaction.entity.service.impl;

import com.birdwind.autoTransaction.entity.dao.MemberRoleRelateDao;
import com.birdwind.autoTransaction.entity.dao.RoleDao;
import com.birdwind.autoTransaction.entity.model.Role;
import com.birdwind.autoTransaction.entity.service.RoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;
import javax.transaction.Transactional;

@Service
@Transactional
public class RoleServiceImpl implements RoleService {

    @Autowired
    private RoleDao roleDao;

    @Autowired
    private MemberRoleRelateDao memberRoleRelateDao;

    @Override
    public Optional<Role> getRoleByRoleUuid(String roleUuid) {
        return roleDao.findRoleByRoleUuid(roleUuid);
    }

    @Override
    public Optional<Role> getRoleByRoleId(int roleId) {
        return roleDao.findRolesByRoleId(roleId);
    }

    @Override
    public List<Role> getRolesByMemberId(Integer memberId) {
        return roleDao.findRolesByMemberId(memberId);
    }

    @Override
    public List<Role> getAllRoles() {
        return roleDao.findAllRoles();
    }

}
