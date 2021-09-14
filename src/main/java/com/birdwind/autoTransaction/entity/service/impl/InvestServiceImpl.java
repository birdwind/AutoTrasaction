package com.birdwind.autoTransaction.entity.service.impl;

import com.birdwind.autoTransaction.base.utils.CounterUtils;
import com.birdwind.autoTransaction.base.utils.DateTimeUtils;
import com.birdwind.autoTransaction.base.view.filter.SearchCondition;
import com.birdwind.autoTransaction.entity.dao.FundsDao;
import com.birdwind.autoTransaction.entity.dao.FundsMemberRelateDao;
import com.birdwind.autoTransaction.entity.dao.InvestDao;
import com.birdwind.autoTransaction.entity.dao.InvestMemberRelateDao;
import com.birdwind.autoTransaction.entity.model.*;
import com.birdwind.autoTransaction.entity.service.InvestService;
import com.birdwind.autoTransaction.enums.NumberEnum;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.Date;
import java.util.Optional;
import java.util.concurrent.atomic.AtomicInteger;

@Service
@Transactional
public class InvestServiceImpl implements InvestService {

    @Autowired
    private InvestDao investDao;

    @Autowired
    private InvestMemberRelateDao investMemberRelateDao;

    @Autowired
    private FundsDao fundsDao;

    @Autowired
    private FundsMemberRelateDao fundsMemberRelateDao;

    private static final AtomicInteger counter = new AtomicInteger(-1);

    @Override
    public String generateInvestNo(Date date) {
        if (counter.get() == -1) {
            int temp = investDao.countTodayInvest();
            counter.set(temp);
        }
        Integer index = CounterUtils.incrementAndGet(counter, date);
        return NumberEnum.INVEST.valueOf() + DateTimeUtils.numberFormat(date) + index;
    }

    @Override
    public Page<Invest> getInvestBySearchCondition(SearchCondition<Invest> searchCondition) {
        return investDao.findAll(searchCondition.addSpecification("status", true).getSpecification(),
            searchCondition.getPageable());
    }

    @Override
    public Optional<Invest> getInvestByInvestUuid(String investUuid) {
        return investDao.findAllInvestByInvestUuid(investUuid);
    }

    @Override
    public Invest save(Invest invest, Member member) {
        invest = investDao.save(invest);
        investMemberRelateDao.save(new InvestMemberRelate(invest, member));
        Funds funds = fundsDao.findFundsByMember(member);
        if(invest.getInvestType().getInvestTypeId() == 1){
            funds.setAmount(funds.getAmount().add(invest.getAmount()));
        }else if(invest.getInvestType().getInvestTypeId() == 2){
            funds.setAmount(funds.getAmount().subtract(invest.getAmount()));
        }
        fundsDao.save(funds);
        return invest;
    }

    @Override
    public Invest save(Invest invest) {
        return investDao.save(invest);
    }

    @Override
    public Invest delete(Invest invest) {
        invest.delete();
        return investDao.save(invest);
    }
}
