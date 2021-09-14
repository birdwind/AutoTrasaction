package com.birdwind.autoTransaction.entity.service;

import com.birdwind.autoTransaction.base.view.filter.SearchCondition;
import com.birdwind.autoTransaction.entity.model.Currency;
import com.birdwind.autoTransaction.entity.model.Member;
import com.birdwind.autoTransaction.entity.model.Transaction;
import com.birdwind.autoTransaction.entity.model.TransactionBuyerRelate;
import org.springframework.data.domain.Page;

import java.util.Date;
import java.util.List;

public interface TransactionService {

    String generateTransactionNo(Date date);

    Page<Transaction> getTransactionBySearchCondition(SearchCondition<Transaction> searchCondition);

    Transaction save(Transaction transaction, List<TransactionBuyerRelate> transactionDetailList);

    List<Transaction> save(List<Transaction> transaction);

    Transaction save(Transaction transaction);

    List<Transaction> getAllTransaction();

    List<Transaction> getTransactionsByCurrencyAndLave(Currency currency);

    List<Transaction> getTransactionInLaveLargeZero();

    List<Transaction> getTransactionInLaveLargeZeroByMember(Member member);
}
