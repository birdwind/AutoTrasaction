package com.birdwind.springBootInit.entity.dao;

import com.birdwind.springBootInit.base.repo.BaseRepository;
import com.birdwind.springBootInit.entity.model.Module;
import org.springframework.data.jpa.repository.Query;
import java.util.List;
import java.util.Optional;

public interface ModuleDao extends BaseRepository<Module, Integer> {

    @Query("SELECT m FROM Module m")
    Optional<List<Module>> findAllModules();

    // 僅做用role控制可控module
    @Query(value = "(SELECT m.* FROM module AS m " + "JOIN module_role_relate AS mrr ON m.module_id = mrr.module_id "
        + "JOIN role AS r ON mrr.role_id = r.role_id "
        + "JOIN member_role_relate AS memrr ON memrr.role_id = r.role_id "
        + "JOIN member AS mem ON mem.member_id = memrr.member_id "
        + "WHERE mem.member_id = ?1 AND m.status = 1 AND mrr.status = 1 AND r.status = 1 "
        + "AND memrr.status = 1 AND mem.status = 1)", nativeQuery = true)
    Optional<List<Module>> findModulesByMemberCoreId(Integer memberId);

    // @Query(value = "(SELECT m.* FROM module AS m "
    // + "JOIN module_group_relate AS mgr ON m.module_id = mgr.module_id "
    // + "JOIN member_group AS mg ON mgr.member_group_id = mg.member_group_id "
    // + "JOIN member_group_relate AS memgr ON mg.member_group_id = memgr.member_group_id "
    // + "JOIN member AS mem ON mem.member_id = memgr.member_id "
    // + "WHERE mem.member_id = ?1 AND m.status = 1 AND mgr.status = 1 AND mg.status = 1 "
    // + "AND memgr.status = 1 AND mem.status = 1) UNION (SELECT m.* FROM module AS m "
    // + "JOIN module_role_relate AS mrr ON m.module_id = mrr.module_id "
    // + "JOIN role AS r ON mrr.role_id = r.role_id "
    // + "JOIN member_role_relate AS memrr ON memrr.role_id = r.role_id "
    // + "JOIN member AS mem ON mem.member_id = memrr.member_id "
    // + "WHERE mem.member_id = ?1 AND m.status = 1 AND mrr.status = 1 AND r.status = 1 "
    // + "AND memrr.status = 1 AND mem.status = 1)", nativeQuery = true)
    // Optional<Set<Module>> findModulesByMemberCoreId(Integer memberId);

}

/*
 * SELECT m.* FROM module AS m JOIN module_role_relate AS mrr ON m.module_id = mrr.module_id JOIN role AS r ON
 * mrr.role_id = r.role_id JOIN member_role_relate AS memrr ON memrr.role_id = r.role_id JOIN member AS mem ON
 * mem.member_id = memrr.member_id WHERE mem.member_id = ?1 AND m.status = 1 AND mrr.status = 1 AND r.status = 1 AND
 * memrr.status = 1 AND mem.status = 1
 */
