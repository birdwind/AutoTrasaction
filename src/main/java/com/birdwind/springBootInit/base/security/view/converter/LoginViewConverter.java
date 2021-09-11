package com.birdwind.springBootInit.base.security.view.converter;

import com.birdwind.springBootInit.base.security.view.LoginView;
import com.birdwind.springBootInit.base.view.converter.AbstractViewConverter;
import com.birdwind.springBootInit.entity.model.Member;
import org.springframework.stereotype.Component;

@Component
public class LoginViewConverter extends AbstractViewConverter<Member, LoginView> {
    @Override
    public LoginView convert(Member source) {
        return complexMapping(source, LoginView.class);
    }
}
