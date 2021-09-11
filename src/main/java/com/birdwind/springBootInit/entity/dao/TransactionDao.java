package com.birdwind.springBootInit.entity.dao;

import com.birdwind.springBootInit.base.repo.BaseRepository;
import com.birdwind.springBootInit.entity.model.Currency;
import com.birdwind.springBootInit.entity.model.Member;
import com.birdwind.springBootInit.entity.model.Transaction;
import org.springframework.data.jpa.repository.Query;
import java.math.BigDecimal;
import java.util.List;

public interface TransactionDao extends BaseRepository<Transaction, Integer> {

    @Query(value = "SELECT COUNT(*) FROM `transaction` WHERE DATEDIFF(NOW(), create_date) = 0", nativeQuery = true)
    Integer countTodayTransaction();

    @Query(value = "SELECT T FROM Transaction T WHERE T.status = true ")
    List<Transaction> findAll();

    @Query(
        value = "SELECT T FROM Transaction T WHERE T.status = true AND T.currency = ?1 AND T.type = 0 AND T.lave > 0 ")
    List<Transaction> findTransactionByCurrencyAndSaleTypeAndLave(Currency currency);

    @Query(value = "SELECT T FROM Transaction T WHERE T.status = true AND T.type = ?1 AND T.lave > ?2")
    List<Transaction> findTransactionsByTypeAndLave(int type, BigDecimal lave);

    @Query(
        value = "SELECT T FROM Transaction T JOIN TransactionBuyerRelate TBR ON TBR.status = true AND TBR.transaction = T AND TBR.member = ?3 WHERE T.type = ?1 AND T.lave > ?2")
    List<Transaction> findTransactionsByTypeAndLaveAndMember(int type, BigDecimal lave, Member member);
}
