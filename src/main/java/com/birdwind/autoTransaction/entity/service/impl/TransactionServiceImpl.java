package com.birdwind.autoTransaction.entity.service.impl;

import com.birdwind.autoTransaction.base.utils.CounterUtils;
import com.birdwind.autoTransaction.base.utils.DateTimeUtils;
import com.birdwind.autoTransaction.base.view.filter.SearchCondition;
import com.birdwind.autoTransaction.entity.dao.TransactionBuyerRelateDao;
import com.birdwind.autoTransaction.entity.dao.TransactionDao;
import com.birdwind.autoTransaction.entity.model.Currency;
import com.birdwind.autoTransaction.entity.model.Member;
import com.birdwind.autoTransaction.entity.model.Transaction;
import com.birdwind.autoTransaction.entity.model.TransactionBuyerRelate;
import com.birdwind.autoTransaction.entity.service.TransactionService;
import com.birdwind.autoTransaction.enums.NumberEnum;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;
import java.math.BigDecimal;
import java.util.Date;
import java.util.List;
import java.util.concurrent.atomic.AtomicInteger;
import java.util.stream.Collectors;
import javax.transaction.Transactional;

@Service
@Transactional
public class TransactionServiceImpl implements TransactionService {

    @Autowired
    private TransactionDao transactionDao;

    @Autowired
    private TransactionBuyerRelateDao transactionBuyerRelateDao;

    private static final AtomicInteger counter = new AtomicInteger(-1);

    @Override
    public String generateTransactionNo(Date date) {
        if (counter.get() == -1) {
            counter.set(transactionDao.countTodayTransaction());
        }
        Integer index = CounterUtils.incrementAndGet(counter, date);
        return NumberEnum.TRANSACTION.valueOf() + DateTimeUtils.numberFormat(date) + index;
    }

    @Override
    public Page<Transaction> getTransactionBySearchCondition(SearchCondition<Transaction> searchCondition) {
        return transactionDao.findAll(searchCondition.addSpecification("status", true).getSpecification(),
            searchCondition.getPageable());
    }

    @Override
    public Transaction save(Transaction transaction, List<TransactionBuyerRelate> transactionDetailList) {
        transaction = transactionDao.save(transaction);
        Transaction finalTransaction = transaction;
        transactionBuyerRelateDao.saveAll(
            transactionDetailList.stream().peek(transactionDetail -> transactionDetail.setTransaction(finalTransaction))
                .collect(Collectors.toList()));
        return transaction;
    }

    @Override
    public List<Transaction> save(List<Transaction> transaction) {
        return transactionDao.saveAll(transaction);
    }

    @Override
    public Transaction save(Transaction transaction) {
        return transactionDao.save(transaction);
    }

    @Override
    public List<Transaction> getAllTransaction() {
        return transactionDao.findAll();
    }

    @Override
    public List<Transaction> getTransactionsByCurrencyAndLave(Currency currency) {
        return transactionDao.findTransactionByCurrencyAndSaleTypeAndLave(currency);
    }

    @Override
    public List<Transaction> getTransactionInLaveLargeZero() {
        return transactionDao.findTransactionsByTypeAndLave(0, BigDecimal.ZERO);
    }

    @Override
    public List<Transaction> getTransactionInLaveLargeZeroByMember(Member member) {
        return transactionDao.findTransactionsByTypeAndLaveAndMember(0, BigDecimal.ZERO, member);
    }
}
