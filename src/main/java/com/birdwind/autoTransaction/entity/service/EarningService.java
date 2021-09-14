package com.birdwind.autoTransaction.entity.service;

import com.birdwind.autoTransaction.entity.model.Earning;
import com.birdwind.autoTransaction.entity.model.Member;
import java.util.List;
import java.util.Optional;

public interface EarningService {

    Earning save(Earning earning);

    Optional<List<Earning>> getEarningByMember(Member member);
}
