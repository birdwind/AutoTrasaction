package com.birdwind.springBootInit.entity.service.impl;

import com.birdwind.springBootInit.entity.dao.FundsDao;
import com.birdwind.springBootInit.entity.model.Funds;
import com.birdwind.springBootInit.entity.model.Member;
import com.birdwind.springBootInit.entity.service.FundsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.math.BigDecimal;
import java.util.List;
import javax.transaction.Transactional;

@Service
@Transactional
public class FundsServiceImpl implements FundsService {

    @Autowired
    private FundsDao fundsDao;

    @Override
    public Funds getFundsByMember(Member member) {
        return fundsDao.findFundsByMember(member);
    }

    @Override
    public BigDecimal getAllFundsAmountSum() {
        return fundsDao.findFundsAmountSum();
    }

    @Override
    public List<Funds> save(List<Funds> funds) {
        return fundsDao.saveAll(funds);
    }
}
