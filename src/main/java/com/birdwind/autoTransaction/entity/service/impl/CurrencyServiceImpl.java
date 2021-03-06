package com.birdwind.autoTransaction.entity.service.impl;

import com.birdwind.autoTransaction.entity.dao.CurrencyDao;
import com.birdwind.autoTransaction.entity.model.Currency;
import com.birdwind.autoTransaction.entity.service.CurrencyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class CurrencyServiceImpl implements CurrencyService {

    @Autowired
    private CurrencyDao currencyDao;

    @Override
    public List<Currency> getAllCurrency() {
        return currencyDao.findAllCurrency();
    }

    @Override
    public Optional<Currency> getCurrencyByCurrencyName(String currencyName) {
        return currencyDao.findCurrencyByCurrencyName(currencyName);
    }

    @Override
    public Currency save(Currency currency) {
        return currencyDao.save(currency);
    }
}
