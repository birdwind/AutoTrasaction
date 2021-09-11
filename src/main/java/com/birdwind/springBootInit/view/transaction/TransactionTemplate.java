package com.birdwind.springBootInit.view.transaction;

import com.birdwind.springBootInit.base.annotation.SubView;
import com.birdwind.springBootInit.base.view.abstracts.AbstractTemplate;
import java.io.Serializable;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class TransactionTemplate extends AbstractTemplate {

    @SubView(view = TransactionView.class)
    private Serializable transaction;
}
