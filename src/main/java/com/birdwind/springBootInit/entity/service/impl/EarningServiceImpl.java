package com.birdwind.springBootInit.entity.service.impl;

import com.birdwind.springBootInit.entity.dao.EarningDao;
import com.birdwind.springBootInit.entity.model.Earning;
import com.birdwind.springBootInit.entity.model.Member;
import com.birdwind.springBootInit.entity.service.EarningService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import javax.transaction.Transactional;

@Service
@Transactional
public class EarningServiceImpl implements EarningService {

    @Autowired
    private EarningDao earningDao;

    @Override
    public Earning save(Earning earning) {
        return earningDao.save(earning);
    }

    @Override
    public Optional<List<Earning>> getEarningByMember(Member member) {
        return earningDao.findEarningByMember(member);
    }
}
