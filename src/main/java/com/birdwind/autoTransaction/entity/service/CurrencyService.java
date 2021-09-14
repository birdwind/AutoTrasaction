package com.birdwind.autoTransaction.entity.service;

import com.birdwind.autoTransaction.entity.model.Currency;

import java.util.List;
import java.util.Optional;

public interface CurrencyService {
    List<Currency> getAllCurrency();

    Optional<Currency> getCurrencyByCurrencyName(String currencyName);

    Currency save(Currency currency);
}
