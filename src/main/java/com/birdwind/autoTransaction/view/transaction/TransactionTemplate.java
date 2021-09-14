package com.birdwind.autoTransaction.view.transaction;

import com.birdwind.autoTransaction.base.annotation.SubView;
import com.birdwind.autoTransaction.base.view.abstracts.AbstractTemplate;
import java.io.Serializable;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class TransactionTemplate extends AbstractTemplate {

    @SubView(view = TransactionView.class)
    private Serializable transaction;
}
