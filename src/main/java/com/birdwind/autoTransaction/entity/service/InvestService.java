package com.birdwind.autoTransaction.entity.service;

import com.birdwind.autoTransaction.base.view.filter.SearchCondition;
import com.birdwind.autoTransaction.entity.model.Invest;
import com.birdwind.autoTransaction.entity.model.Member;
import org.springframework.data.domain.Page;
import java.util.Date;
import java.util.Optional;

public interface InvestService {

    String generateInvestNo(Date date);

    Page<Invest> getInvestBySearchCondition(SearchCondition<Invest> searchCondition);

    Optional<Invest> getInvestByInvestUuid(String investUuid);

    Invest save(Invest invest, Member member);

    Invest save(Invest invest);

    Invest delete(Invest invest);

}
