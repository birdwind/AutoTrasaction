package com.birdwind.autoTransaction.base.security.view;

import com.birdwind.autoTransaction.base.view.abstracts.AbstractView;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class LoginView extends AbstractView {

    private String username;

    private String status;

}
