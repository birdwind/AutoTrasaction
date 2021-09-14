package com.birdwind.autoTransaction.entity.service.impl;

import com.birdwind.autoTransaction.base.security.model.SystemUser;
import com.birdwind.autoTransaction.entity.dao.MemberTeamRelateDao;
import com.birdwind.autoTransaction.entity.dao.TeamDao;
import com.birdwind.autoTransaction.entity.model.Member;
import com.birdwind.autoTransaction.entity.model.MemberTeamRelate;
import com.birdwind.autoTransaction.entity.model.Team;
import com.birdwind.autoTransaction.entity.service.TeamService;
import com.birdwind.autoTransaction.enums.NumberEnum;
import com.google.common.collect.Lists;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;
import java.util.concurrent.atomic.AtomicInteger;
import javax.transaction.Transactional;

@Service
@Transactional
public class TeamServiceImpl implements TeamService {

    @Autowired
    private TeamDao teamDao;

    @Autowired
    private MemberTeamRelateDao memberTeamRelateDao;

    private AtomicInteger counter = new AtomicInteger(-1);

    @Override
    public String generateTeamNo() {
        if (counter.get() == -1) {
            counter.set(teamDao.countTeams());
        }
        return NumberEnum.TEAM.valueOf() + counter.getAndIncrement();
    }

    @Override
    public Optional<Team> getTeamByTeamValue(String teamValue) {
        return teamDao.findTeamByTeamValue(teamValue);
    }

    @Override
    public Optional<Team> getTeamByTeamUuid(String teamUuid) {
        return teamDao.findTeamByTeamUuid(teamUuid);
    }

    @Override
    public Optional<Team> getAllTeamByTeamUuid(String teamUuid) {
        return teamDao.findAllTeamByTeamUuid(teamUuid);
    }

    @Override
    public List<Team> getAllTeams() {
        return teamDao.findAllTeams().orElse(Lists.newArrayList());
    }

    @Override
    public Optional<Team> checkTeamJoinedByMemberAndTeamId(Member member, int teamId) {
        return teamDao.findTeamJoinedByMemberAndTeamId(member, teamId);
    }

    @Override
    public Team saveTeam(Team team) {
        return teamDao.save(team);
    }

    @Override
    public Team updateTeam(Team team) {
        return teamDao.save(team);
    }

    @Override
    public Team joinTeam(Team team) {
        if (team == null) {
            return null;
        }
        Member member = SystemUser.getMember();
        MemberTeamRelate memberTeamRelate =
            memberTeamRelateDao.checkExistRelate(member.getMemberId(), team.getTeamId());
        return memberTeamRelate != null ? memberTeamRelate.getTeam()
            : memberTeamRelateDao.save(new MemberTeamRelate(member, team)).getTeam();
    }
}
