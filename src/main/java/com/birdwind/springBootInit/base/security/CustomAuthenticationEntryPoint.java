package com.birdwind.springBootInit.base.security;

import com.birdwind.springBootInit.base.constans.BaseErrorConstants;
import com.birdwind.springBootInit.base.enums.ErrorCode;
import com.birdwind.springBootInit.base.system.converter.SystemResourcePacker;
import com.birdwind.springBootInit.base.utils.LocaleI18nUtils;
import com.birdwind.springBootInit.base.utils.ServletUtils;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;

@Component
public class CustomAuthenticationEntryPoint implements AuthenticationEntryPoint {

    @Autowired
    private SystemResourcePacker systemResourcePacker;

    @Override
    public void commence(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse,
                         AuthenticationException authenticationException) throws ServletException {
        try {
            // System.out.println("Custom" + "false");
            ServletUtils.setResponse(httpServletResponse,
                systemResourcePacker.packErrors(HttpStatus.UNAUTHORIZED,
                    LocaleI18nUtils.getString(BaseErrorConstants.NO_PERMISSION), ErrorCode.NO_PERMISSION.errorCode(),
                    ErrorCode.NO_PERMISSION.errorMsg()));
        } catch (Exception e) {
            throw new ServletException();
        }
    }
}
