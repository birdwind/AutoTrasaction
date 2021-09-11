package com.birdwind.springBootInit.entity.dao;

import com.birdwind.springBootInit.base.repo.BaseRepository;
import com.birdwind.springBootInit.entity.model.Currency;
import com.birdwind.springBootInit.entity.model.Funds;
import com.birdwind.springBootInit.entity.model.Member;
import org.springframework.data.jpa.repository.Query;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

public interface FundsDao extends BaseRepository<Funds, Integer> {

    @Query("SELECT F FROM Funds F WHERE F.fundsMemberRelate.member = ?1 AND F.status = true AND F.fundsMemberRelate.status = true ")
    Funds findFundsByMember(Member member);

    @Query("SELECT SUM(F.amount) FROM Funds F WHERE F.status = true ")
    BigDecimal findFundsAmountSum();

}
