package com.birdwind.springBootInit.view.invest.deposit.converter;

import com.birdwind.springBootInit.base.dto.mapper.provider.StringColumnProvider;
import com.birdwind.springBootInit.base.view.converter.AbstractViewConverter;
import com.birdwind.springBootInit.entity.model.Invest;
import com.birdwind.springBootInit.entity.model.InvestMemberRelate;
import com.birdwind.springBootInit.entity.model.Member;
import com.birdwind.springBootInit.view.invest.deposit.InvestDepositView;
import com.google.common.collect.Lists;
import org.springframework.stereotype.Component;

import java.util.Optional;

@Component
public class InvestDepositViewConverter extends AbstractViewConverter<Invest, InvestDepositView> {

    private StringColumnProvider<Invest> memberUuidProvider =
        (source, targetField) -> Optional.ofNullable(source.getInvestMemberRelates()).orElse(Lists.newArrayList())
            .stream().map(InvestMemberRelate::getMember).map(Member::getName).findFirst().orElse("");

    @Override
    public InvestDepositView convert(Invest source) {
        addValueProvider("memberUuid", memberUuidProvider);
        return complexMapping(source, InvestDepositView.class);
    }
}
