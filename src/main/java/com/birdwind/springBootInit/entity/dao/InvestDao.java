package com.birdwind.springBootInit.entity.dao;

import com.birdwind.springBootInit.base.repo.BaseRepository;
import com.birdwind.springBootInit.entity.model.Invest;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;


public interface InvestDao extends BaseRepository<Invest, Integer> {

    @Query(value = "SELECT COUNT(*) FROM `invest` WHERE DATEDIFF(NOW(), create_date) = 0", nativeQuery = true)
    Integer countTodayInvest();

    @Query(value = "SELECT i FROM Invest i WHERE i.status = 1 AND i.investUuid = ?1")
    Optional<Invest> findAllInvestByInvestUuid(String investUuid);

}
