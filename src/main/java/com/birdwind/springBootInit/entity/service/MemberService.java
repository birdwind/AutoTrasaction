package com.birdwind.springBootInit.entity.service;

import com.birdwind.springBootInit.base.view.filter.SearchCondition;
import com.birdwind.springBootInit.entity.model.Member;
import com.birdwind.springBootInit.entity.model.MemberRoleRelate;
import com.birdwind.springBootInit.entity.model.Role;
import org.springframework.data.domain.Page;
import java.util.Collection;
import java.util.List;
import java.util.Optional;

public interface MemberService {

    String generateMemberNo();

    Optional<Member> getMemberByUsername(String username);

    void updateSession(String session, Integer memberId);

    Optional<Member> getMemberCoreBySession(String session);

    Member saveWithRoleRelate(Member member, Collection<MemberRoleRelate> memberRoleRelates);

    List<Member> delete(Collection<Member> member);

    Optional<Member> getMemberByMemberUuid(String memberUuid);

    Member save(Member member);

    Member save(Member member, Role role);

    List<Member> getMemberCoreByRoleId(int id);

    Page<Member> getMemberBySearchConditionAndRoleId(SearchCondition<Member> searchCondition, int roleId);
}
