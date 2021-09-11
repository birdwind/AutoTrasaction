package com.birdwind.springBootInit.entity.service.impl;

import com.birdwind.springBootInit.entity.dao.InvestTypeDao;
import com.birdwind.springBootInit.entity.model.InvestType;
import com.birdwind.springBootInit.entity.service.InvestTypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;
import javax.transaction.Transactional;

@Service
@Transactional
public class InvestTypeServiceImpl implements InvestTypeService {

    @Autowired
    private InvestTypeDao investTypeDao;

    @Override
    public List<InvestType> getAllInvestType() {
        return investTypeDao.findAllInvestType();
    }

    @Override
    public Optional<InvestType> getInvestTypeByInvestTypeUuid(String investType) {
        return investTypeDao.findInvestTypeByInvestTypeUuid(investType);
    }
}
