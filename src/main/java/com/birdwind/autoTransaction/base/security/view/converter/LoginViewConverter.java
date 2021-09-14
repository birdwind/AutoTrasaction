package com.birdwind.autoTransaction.base.security.view.converter;

import com.birdwind.autoTransaction.base.security.view.LoginView;
import com.birdwind.autoTransaction.base.view.converter.AbstractViewConverter;
import com.birdwind.autoTransaction.entity.model.Member;
import org.springframework.stereotype.Component;

@Component
public class LoginViewConverter extends AbstractViewConverter<Member, LoginView> {
    @Override
    public LoginView convert(Member source) {
        return complexMapping(source, LoginView.class);
    }
}
