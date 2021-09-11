package com.birdwind.springBootInit.view.invest.deposit.converter;

import com.birdwind.springBootInit.base.dto.mapper.provider.PrimitiveProvider;
import com.birdwind.springBootInit.base.utils.LocaleI18nUtils;
import com.birdwind.springBootInit.base.view.grid.abstracts.AbstractPageGridConverter;
import com.birdwind.springBootInit.entity.model.Invest;
import com.birdwind.springBootInit.entity.model.InvestMemberRelate;
import com.birdwind.springBootInit.entity.model.Member;
import com.birdwind.springBootInit.view.invest.deposit.InvestDepositPageGrid;
import com.birdwind.springBootInit.view.invest.deposit.InvestDepositPageGridRow;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.Optional;

@Component
public class InvestDepositPageGridConverter
    extends AbstractPageGridConverter<Invest, InvestDepositPageGridRow, InvestDepositPageGrid> {

    private PrimitiveProvider<Invest> investTypeUuidProvider =
        (source, targetField) -> LocaleI18nUtils.getString(source.getInvestType().getInvestTypeValue());

    private PrimitiveProvider<Invest> memberProvider =
        (source, targetField) -> Optional.ofNullable(source.getInvestMemberRelates()).orElse(new ArrayList<>()).stream()
            .filter(investMemberRelate -> investMemberRelate.getInvest() == source).map(InvestMemberRelate::getMember)
            .map(Member::getName).findFirst().orElse("");

    @Override
    public InvestDepositPageGridRow convert(Invest source) {
        addValueProvider("investTypeUuid", investTypeUuidProvider);
        addValueProvider("member", memberProvider);
        return complexMapping(source, InvestDepositPageGridRow.class);
    }
}
