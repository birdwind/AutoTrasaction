package com.birdwind.springBootInit.view.invest.deposit;

import com.birdwind.springBootInit.base.annotation.SubView;
import com.birdwind.springBootInit.base.view.abstracts.AbstractTemplate;
import java.io.Serializable;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class InvestDepositTemplate extends AbstractTemplate {

    @SubView(view = InvestDepositView.class)
    private Serializable investDeposit;

}
