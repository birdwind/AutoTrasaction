package com.birdwind.autoTransaction.entity.service.impl;

import com.birdwind.autoTransaction.entity.dao.EarningMemberRelateDao;
import com.birdwind.autoTransaction.entity.model.EarningMemberRelate;
import com.birdwind.autoTransaction.entity.service.EarningMemberRelateService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import javax.transaction.Transactional;

@Service
@Transactional
public class EarningMemberRelateServiceImpl implements EarningMemberRelateService {

    @Autowired
    private EarningMemberRelateDao earningMemberRelateDao;

    @Override
    public List<EarningMemberRelate> save(List<EarningMemberRelate> earningMemberRelateList) {
        return earningMemberRelateDao.saveAll(earningMemberRelateList);
    }
}
