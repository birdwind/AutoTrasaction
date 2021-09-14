package com.birdwind.autoTransaction.entity.service;

import com.birdwind.autoTransaction.entity.model.InvestType;
import java.util.List;
import java.util.Optional;

public interface InvestTypeService {
    List<InvestType> getAllInvestType();
    Optional<InvestType> getInvestTypeByInvestTypeUuid(String investType);
}
