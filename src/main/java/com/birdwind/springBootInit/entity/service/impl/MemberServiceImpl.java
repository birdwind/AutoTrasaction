package com.birdwind.springBootInit.entity.service.impl;

import com.birdwind.springBootInit.base.repo.BaseModel;
import com.birdwind.springBootInit.base.utils.CounterUtils;
import com.birdwind.springBootInit.base.utils.DateTimeUtils;
import com.birdwind.springBootInit.base.view.filter.SearchCondition;
import com.birdwind.springBootInit.entity.dao.FundsDao;
import com.birdwind.springBootInit.entity.dao.FundsMemberRelateDao;
import com.birdwind.springBootInit.entity.dao.MemberDao;
import com.birdwind.springBootInit.entity.dao.MemberRoleRelateDao;
import com.birdwind.springBootInit.entity.model.Funds;
import com.birdwind.springBootInit.entity.model.FundsMemberRelate;
import com.birdwind.springBootInit.entity.model.Member;
import com.birdwind.springBootInit.entity.model.MemberRoleRelate;
import com.birdwind.springBootInit.entity.model.Role;
import com.birdwind.springBootInit.entity.service.MemberService;
import com.birdwind.springBootInit.enums.NumberEnum;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;
import java.util.Collection;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.concurrent.atomic.AtomicInteger;
import java.util.stream.Collectors;
import javax.transaction.Transactional;

@Service
@Transactional
public class MemberServiceImpl implements MemberService {

    @Autowired
    private MemberDao memberDao;

    @Autowired
    private FundsDao fundsDao;

    @Autowired
    private FundsMemberRelateDao fundsMemberRelateDao;

    @Autowired
    private MemberRoleRelateDao memberRoleRelateDao;

    private AtomicInteger counter = new AtomicInteger(-1);

    @Override
    public String generateMemberNo() {
        if (counter.get() == -1) {
            counter.set(memberDao.countMembers());
        }
        Integer index = CounterUtils.incrementAndGet(counter, new Date());
        return NumberEnum.MEMBER.valueOf() + DateTimeUtils.numberFormat(new Date()) + index;
    }

    @Override
    public Optional<Member> getMemberByUsername(String username) {
        return memberDao.findMemberCoreByUsername(username);
    }

    @Override
    public void updateSession(String session, Integer memberId) {
        memberDao.updateSession(session, memberId);
    }

    @Override
    public Optional<Member> getMemberCoreBySession(String session) {
        return memberDao.findMemberCoreBySession(session);
    }

    @Override
    public Member saveWithRoleRelate(Member member, Collection<MemberRoleRelate> memberRoleRelates) {
        Member newMember = memberDao.save(member);
        memberRoleRelateDao.saveAll(
            memberRoleRelates.stream().peek(relate -> relate.setMember(newMember)).collect(Collectors.toList()));
        return newMember;
    }

    @Override
    public List<Member> delete(Collection<Member> members) {
        return memberDao.saveAll(members.stream().peek(BaseModel::delete).collect(Collectors.toList()));
    }

    @Override
    public Optional<Member> getMemberByMemberUuid(String memberUuid) {
        return memberDao.findMemberByMemberUuid(memberUuid);
    }

    @Override
    public Member save(Member member) {
        member = memberDao.save(member);
        return member;
    }

    @Override
    public Member save(Member member, Role role) {
        member = save(member);
        Funds funds = fundsDao.save(new Funds());
        fundsMemberRelateDao.save(new FundsMemberRelate(funds, member));
        memberRoleRelateDao.save(new MemberRoleRelate(member, role));
        return member;
    }

    @Override
    public List<Member> getMemberCoreByRoleId(int roleId) {
        return memberDao.findAllMembersByRoleId(roleId);
    }

    @Override
    public Page<Member> getMemberBySearchConditionAndRoleId(SearchCondition<Member> searchCondition, int roleId) {
        return memberDao
            .findAll(
                searchCondition.addSpecification("status", true)
                    .addSpecification("memberRoleRelates.role.roleId", roleId).getSpecification(),
                searchCondition.getPageable());
    }
}
