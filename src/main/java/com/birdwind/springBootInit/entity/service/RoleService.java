package com.birdwind.springBootInit.entity.service;

import com.birdwind.springBootInit.entity.model.Role;
import java.util.List;
import java.util.Optional;

public interface RoleService {

    Optional<Role> getRoleByRoleUuid(String roleUuid);

    Optional<Role> getRoleByRoleId(int roleId);

    List<Role> getRolesByMemberId(Integer memberId);

    List<Role> getAllRoles();

}
