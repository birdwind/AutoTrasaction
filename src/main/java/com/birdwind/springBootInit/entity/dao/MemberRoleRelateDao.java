package com.birdwind.springBootInit.entity.dao;

import com.birdwind.springBootInit.base.repo.BaseRepository;
import com.birdwind.springBootInit.entity.model.MemberRoleRelate;
import org.springframework.data.jpa.repository.Query;
import java.util.Optional;

public interface MemberRoleRelateDao extends BaseRepository<MemberRoleRelate, Integer> {

    @Query(value = "SELECT mrr FROM MemberRoleRelate mrr WHERE mrr.status = true AND mrr.role.roleUuid = ?1 "
        + "AND mrr.member.memberId = ?2")
    Optional<MemberRoleRelate> findMemberRoleRelateByRoleUuidAndMemberId(String roleUuid, Integer memberId);

}
