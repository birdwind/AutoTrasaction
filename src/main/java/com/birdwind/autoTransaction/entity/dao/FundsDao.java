package com.birdwind.autoTransaction.entity.dao;

import com.birdwind.autoTransaction.base.repo.BaseRepository;
import com.birdwind.autoTransaction.entity.model.Funds;
import com.birdwind.autoTransaction.entity.model.Member;
import org.springframework.data.jpa.repository.Query;

import java.math.BigDecimal;

public interface FundsDao extends BaseRepository<Funds, Integer> {

    @Query("SELECT F FROM Funds F WHERE F.fundsMemberRelate.member = ?1 AND F.status = true AND F.fundsMemberRelate.status = true ")
    Funds findFundsByMember(Member member);

    @Query("SELECT SUM(F.amount) FROM Funds F WHERE F.status = true ")
    BigDecimal findFundsAmountSum();

}
