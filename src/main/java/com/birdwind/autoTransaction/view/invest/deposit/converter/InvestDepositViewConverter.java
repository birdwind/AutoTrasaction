package com.birdwind.autoTransaction.view.invest.deposit.converter;

import com.birdwind.autoTransaction.base.dto.mapper.provider.StringColumnProvider;
import com.birdwind.autoTransaction.base.view.converter.AbstractViewConverter;
import com.birdwind.autoTransaction.entity.model.Invest;
import com.birdwind.autoTransaction.entity.model.InvestMemberRelate;
import com.birdwind.autoTransaction.entity.model.Member;
import com.birdwind.autoTransaction.view.invest.deposit.InvestDepositView;
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
