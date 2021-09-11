package com.birdwind.springBootInit.base.security.model;

import java.io.Serializable;
import java.security.Principal;
import java.util.Collection;
import java.util.Set;

import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SystemUser extends User {

    private static final long serialVersionUID = 1L;

    private Serializable core;

    private String session;

    private Serializable sideMenu;

    private Set<String> urls;

    public SystemUser(String username, String password, boolean enabled, boolean accountNonExpired,
        boolean credentialsNonExpired, boolean accountNonLocked, Collection<? extends GrantedAuthority> authorities) {
        super(username, password, enabled, accountNonExpired, credentialsNonExpired, accountNonLocked, authorities);
    }

    public static boolean isLogin() {
        // 已經登入的則是 UserDetailAuthenticationToken
        // 尚未登入的則是 AnonymousAuthenticationToken
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        return authentication != null && authentication.isAuthenticated()
            && !(authentication instanceof AnonymousAuthenticationToken);
    }

    public static boolean isLogin(Principal principal) {
        if (principal == null) {
            return false;
        }

        return !(principal instanceof AnonymousAuthenticationToken);
    }

    @SuppressWarnings("unchecked")
    public static <T extends User> T getCurrentUser() {
        return (T) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
    }

    @SuppressWarnings("unchecked")
    public static <T> T getMember() {
        try {
            return (T) ((SystemUser) getCurrentUser()).getCore();
        } catch (Exception e) {
            return null;
        }
    }

    @SuppressWarnings("unchecked")
    public static <T> T getMember(Principal principal) {
        if (principal == null) {
            return getMember();
        }

        return (T) ((SystemUser) ((Authentication) principal).getPrincipal()).getCore();
    }


    @SuppressWarnings("unchecked")
    public <T> T getSideMenu() {
        try {
            return (T) this.sideMenu;
        } catch (ClassCastException e) {
            return null;
        }
    }

    private Serializable getCore() {
        return this.core;
    }

}
