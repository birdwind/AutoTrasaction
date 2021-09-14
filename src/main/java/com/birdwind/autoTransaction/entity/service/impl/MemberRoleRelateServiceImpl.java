package com.birdwind.autoTransaction.entity.service.impl;

import com.birdwind.autoTransaction.entity.dao.MemberRoleRelateDao;
import com.birdwind.autoTransaction.entity.model.MemberRoleRelate;
import com.birdwind.autoTransaction.entity.service.MemberRoleRelateService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.Optional;
import javax.transaction.Transactional;

@Service
@Transactional
public class MemberRoleRelateServiceImpl implements MemberRoleRelateService {

    @Autowired
    private MemberRoleRelateDao memberRoleRelateDao;

    @Override
    public Optional<MemberRoleRelate> getMemberRoleRelateByRoleUuidAndMemberId(String roleUuid, Integer memberId) {
        return memberRoleRelateDao.findMemberRoleRelateByRoleUuidAndMemberId(roleUuid, memberId);
    }
}
