package com.birdwind.springBootInit.base.security;

import com.birdwind.springBootInit.base.enums.ErrorCode;
import com.birdwind.springBootInit.base.system.converter.SystemResourcePacker;
import com.birdwind.springBootInit.base.utils.LocaleI18nUtils;
import com.birdwind.springBootInit.base.utils.ServletUtils;
import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.logout.LogoutSuccessHandler;
import org.springframework.stereotype.Component;

@Component
public class CustomLogoutHandler implements LogoutSuccessHandler {

    @Autowired
    private SystemResourcePacker systemResourcePacker;

    @Override
    public void onLogoutSuccess(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse,
                                Authentication authentication) throws IOException, ServletException {
        try {
            // System.out.println("Custom" + "false");
            ServletUtils.setResponse(httpServletResponse,
                systemResourcePacker.packErrors(HttpStatus.OK, LocaleI18nUtils.getString("Logout Success"),
                    ErrorCode.SUCCESS.errorCode(), ErrorCode.SUCCESS.errorMsg()));
        } catch (Exception e) {
            throw new ServletException();
        }
    }

}
