package com.birdwind.autoTransaction.base.security.model;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;

public class CheckAuthority {

    public static boolean isSuperAdmin() {
        try {
            User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
            return user.getAuthorities().contains(Authority.SUPER_ADMIN);
        } catch (Exception e) {
            return false;
        }
    }

}
