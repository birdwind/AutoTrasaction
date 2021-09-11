package com.birdwind.springBootInit.entity.service;

import com.birdwind.springBootInit.entity.model.Funds;
import com.birdwind.springBootInit.entity.model.Member;
import java.math.BigDecimal;
import java.util.List;

public interface FundsService {

    Funds getFundsByMember(Member member);

    BigDecimal getAllFundsAmountSum();

    List<Funds> save(List<Funds> funds);
}
