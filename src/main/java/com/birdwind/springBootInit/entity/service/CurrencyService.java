package com.birdwind.springBootInit.entity.service;

import com.birdwind.springBootInit.entity.model.Currency;

import java.util.List;
import java.util.Optional;

public interface CurrencyService {
    List<Currency> getAllCurrency();

    Optional<Currency> getCurrencyByCurrencyName(String currencyName);

    Currency save(Currency currency);
}
