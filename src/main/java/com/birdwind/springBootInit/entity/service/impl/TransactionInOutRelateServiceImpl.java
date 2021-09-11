package com.birdwind.springBootInit.entity.service.impl;

import com.birdwind.springBootInit.entity.dao.TransactionInOutRelateDao;
import com.birdwind.springBootInit.entity.model.TransactionInOutRelate;
import com.birdwind.springBootInit.entity.service.TransactionInOutRelateService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import javax.transaction.Transactional;

@Service
@Transactional
public class TransactionInOutRelateServiceImpl implements TransactionInOutRelateService {

    @Autowired
    private TransactionInOutRelateDao transactionInOutRelateDao;

    @Override
    public List<TransactionInOutRelate> save(List<TransactionInOutRelate> transactionInOutRelateList) {
        return transactionInOutRelateDao.saveAll(transactionInOutRelateList);
    }
}
