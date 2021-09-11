package com.birdwind.springBootInit.entity.service;

import com.birdwind.springBootInit.entity.model.Earning;
import com.birdwind.springBootInit.entity.model.Member;
import java.util.List;
import java.util.Optional;

public interface EarningService {

    Earning save(Earning earning);

    Optional<List<Earning>> getEarningByMember(Member member);
}
