package com.birdwind.autoTransaction.entity.dao;

import com.birdwind.autoTransaction.base.repo.BaseRepository;
import com.birdwind.autoTransaction.entity.model.Earning;
import com.birdwind.autoTransaction.entity.model.Member;
import org.springframework.data.jpa.repository.Query;
import java.util.List;
import java.util.Optional;

public interface EarningDao extends BaseRepository<Earning, Integer> {

    @Query("SELECT DISTINCT E FROM Earning E JOIN Transaction T ON E.transaction = T AND T.status = true " +
            "JOIN TransactionInOutRelate TIOR ON TIOR.transactionOut = T AND TIOR.status = true " +
            "JOIN Transaction T2 ON T2 = TIOR.transactionIn AND T2.status = true " +
            "JOIN TransactionBuyerRelate TBR ON TBR.transaction = T2 AND TBR.status = true " +
            "WHERE TBR.member = ?1 AND E.status = true ")
    Optional<List<Earning>> findEarningByMember(Member member);
}
