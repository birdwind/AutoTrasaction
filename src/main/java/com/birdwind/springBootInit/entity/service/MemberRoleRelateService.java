package com.birdwind.springBootInit.entity.service;

import com.birdwind.springBootInit.entity.model.MemberRoleRelate;
import java.util.Optional;

public interface MemberRoleRelateService {

    Optional<MemberRoleRelate> getMemberRoleRelateByRoleUuidAndMemberId(String roleUuid, Integer memberId);

}
