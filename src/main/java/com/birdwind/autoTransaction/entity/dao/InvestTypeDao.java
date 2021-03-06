package com.birdwind.autoTransaction.entity.dao;

import com.birdwind.autoTransaction.base.repo.BaseRepository;
import com.birdwind.autoTransaction.entity.model.InvestType;
import org.springframework.data.jpa.repository.Query;
import java.util.List;
import java.util.Optional;

public interface InvestTypeDao extends BaseRepository<InvestType, Integer> {

    @Query(value = "SELECT IT FROM InvestType IT WHERE IT.status = 1")
    List<InvestType> findAllInvestType();

    @Query(value = "SELECT IT FROM InvestType IT WHERE IT.status = 1 AND IT.investTypeUuid = ?1")
    Optional<InvestType> findInvestTypeByInvestTypeUuid(String investTypeUuid);
}
