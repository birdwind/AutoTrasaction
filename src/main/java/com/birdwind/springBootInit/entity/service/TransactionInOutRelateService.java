package com.birdwind.springBootInit.entity.service;

import com.birdwind.springBootInit.entity.model.TransactionInOutRelate;
import java.util.List;

public interface TransactionInOutRelateService {

    List<TransactionInOutRelate> save(List<TransactionInOutRelate> transactionInOutRelateList);
}
