package com.birdwind.autoTransaction.entity.service.impl;

import com.birdwind.autoTransaction.entity.dao.TransactionBuyerRelateDao;
import com.birdwind.autoTransaction.entity.model.TransactionBuyerRelate;
import com.birdwind.autoTransaction.entity.service.TransactionDetailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import javax.transaction.Transactional;

@Service
@Transactional
public class TransactionDetailServiceImpl implements TransactionDetailService {

    @Autowired
    private TransactionBuyerRelateDao transactionBuyerRelateDao;

    @Override
    public List<TransactionBuyerRelate> save(List<TransactionBuyerRelate> transactionBuyerRelateList) {
        return transactionBuyerRelateDao.saveAll(transactionBuyerRelateList);
    }
}
