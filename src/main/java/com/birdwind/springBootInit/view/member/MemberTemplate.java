package com.birdwind.springBootInit.view.member;

import com.birdwind.springBootInit.base.annotation.SubView;
import com.birdwind.springBootInit.base.view.abstracts.AbstractTemplate;
import java.io.Serializable;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class MemberTemplate extends AbstractTemplate {

    @SubView(view = MemberView.class)
    private Serializable member;
}
