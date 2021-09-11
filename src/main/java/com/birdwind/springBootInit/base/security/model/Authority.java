package com.birdwind.springBootInit.base.security.model;

import org.springframework.security.core.authority.SimpleGrantedAuthority;

public final class Authority {

    public final static SimpleGrantedAuthority SUPER_ADMIN = new SimpleGrantedAuthority("SUPER_ADMIN");
    public final static SimpleGrantedAuthority ADMIN = new SimpleGrantedAuthority("ADMIN");
    public final static SimpleGrantedAuthority MEMBER = new SimpleGrantedAuthority("MEMBER");

    public static SimpleGrantedAuthority getInstance(String roleKey) {
        return new SimpleGrantedAuthority(roleKey);
    }
}
