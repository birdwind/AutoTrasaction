package com.birdwind.springBootInit.entity.dao;

import com.birdwind.springBootInit.base.repo.BaseRepository;
import com.birdwind.springBootInit.entity.model.Currency;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface CurrencyDao extends BaseRepository<Currency, Integer> {

    @Query("SELECT C FROM Currency C WHERE C.status = true")
    List<Currency> findAllCurrency();

    @Query("SELECT C FROM Currency C WHERE C.status = true AND C.currencyName = ?1")
    Optional<Currency> findCurrencyByCurrencyName(String currencyName);

}
