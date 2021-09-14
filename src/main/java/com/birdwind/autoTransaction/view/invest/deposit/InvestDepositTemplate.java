package com.birdwind.autoTransaction.view.invest.deposit;

import com.birdwind.autoTransaction.base.annotation.SubView;
import com.birdwind.autoTransaction.base.view.abstracts.AbstractTemplate;
import java.io.Serializable;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class InvestDepositTemplate extends AbstractTemplate {

    @SubView(view = InvestDepositView.class)
    private Serializable investDeposit;

}
