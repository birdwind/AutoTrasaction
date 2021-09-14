package com.birdwind.autoTransaction.view.member;

import com.birdwind.autoTransaction.base.annotation.SubView;
import com.birdwind.autoTransaction.base.view.abstracts.AbstractTemplate;
import java.io.Serializable;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class MemberTemplate extends AbstractTemplate {

    @SubView(view = MemberView.class)
    private Serializable member;
}
