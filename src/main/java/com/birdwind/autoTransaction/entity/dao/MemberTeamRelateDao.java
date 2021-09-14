package com.birdwind.autoTransaction.entity.dao;

import com.birdwind.autoTransaction.base.repo.BaseRepository;
import com.birdwind.autoTransaction.entity.model.MemberTeamRelate;
import org.springframework.data.jpa.repository.Query;

public interface MemberTeamRelateDao extends BaseRepository<MemberTeamRelate, Integer> {

    @Query(value = "SELECT mtr FROM MemberTeamRelate mtr "
        + "WHERE mtr.member.memberId = ?1 AND mtr.team.teamId = ?2 AND mtr.status = true ")
    MemberTeamRelate checkExistRelate(Integer memberId, Integer teamId);

}
