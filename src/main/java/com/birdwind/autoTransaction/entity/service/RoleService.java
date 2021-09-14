package com.birdwind.autoTransaction.entity.service;

import com.birdwind.autoTransaction.entity.model.Role;
import java.util.List;
import java.util.Optional;

public interface RoleService {

    Optional<Role> getRoleByRoleUuid(String roleUuid);

    Optional<Role> getRoleByRoleId(int roleId);

    List<Role> getRolesByMemberId(Integer memberId);

    List<Role> getAllRoles();

}
