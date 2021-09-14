package com.birdwind.autoTransaction.entity.service;

import com.birdwind.autoTransaction.entity.model.TransactionBuyerRelate;
import java.util.List;

public interface TransactionDetailService {

    List<TransactionBuyerRelate> save(List<TransactionBuyerRelate> transactionBuyerRelateList);
}
