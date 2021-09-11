package com.birdwind.springBootInit.entity.service;

import com.birdwind.springBootInit.entity.model.TransactionBuyerRelate;
import java.util.List;

public interface TransactionDetailService {

    List<TransactionBuyerRelate> save(List<TransactionBuyerRelate> transactionBuyerRelateList);
}
