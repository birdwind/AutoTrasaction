package com.birdwind.autoTransaction.entity.service;

import com.birdwind.autoTransaction.entity.model.TransactionInOutRelate;
import java.util.List;

public interface TransactionInOutRelateService {

    List<TransactionInOutRelate> save(List<TransactionInOutRelate> transactionInOutRelateList);
}
