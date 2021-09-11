package com.birdwind.springBootInit.entity.service;

import com.birdwind.springBootInit.entity.model.Member;
import com.birdwind.springBootInit.entity.model.Team;
import java.util.List;
import java.util.Optional;

public interface TeamService {

    String generateTeamNo();

    Optional<Team> getTeamByTeamValue(String teamValue);

    Optional<Team> getTeamByTeamUuid(String teamUuid);

    Optional<Team> getAllTeamByTeamUuid(String teamUuid);

    List<Team> getAllTeams();

    Optional<Team> checkTeamJoinedByMemberAndTeamId(Member member, int teamId);

    Team saveTeam(Team team);

    Team updateTeam(Team team);

    Team joinTeam(Team team);

}
