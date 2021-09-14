package com.birdwind.autoTransaction.entity.service;

import com.birdwind.autoTransaction.entity.model.MemberRoleRelate;
import java.util.Optional;

public interface MemberRoleRelateService {

    Optional<MemberRoleRelate> getMemberRoleRelateByRoleUuidAndMemberId(String roleUuid, Integer memberId);

}
