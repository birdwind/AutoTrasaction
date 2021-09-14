package com.birdwind.autoTransaction.entity.service;

import com.birdwind.autoTransaction.entity.model.Funds;
import com.birdwind.autoTransaction.entity.model.Member;
import java.math.BigDecimal;
import java.util.List;

public interface FundsService {

    Funds getFundsByMember(Member member);

    BigDecimal getAllFundsAmountSum();

    List<Funds> save(List<Funds> funds);
}
