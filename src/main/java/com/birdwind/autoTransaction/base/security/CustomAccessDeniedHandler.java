package com.birdwind.autoTransaction.base.security;

import com.birdwind.autoTransaction.base.constans.BaseErrorConstants;
import com.birdwind.autoTransaction.base.enums.ErrorCode;
import com.birdwind.autoTransaction.base.system.converter.SystemResourcePacker;
import com.birdwind.autoTransaction.base.utils.LocaleI18nUtils;
import com.birdwind.autoTransaction.base.utils.ServletUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.web.access.AccessDeniedHandler;
import org.springframework.stereotype.Component;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@Component
public class CustomAccessDeniedHandler implements AccessDeniedHandler {

    @Autowired
    private SystemResourcePacker systemResourcePacker;

    @Override
    public void handle(HttpServletRequest request, HttpServletResponse response,
                       AccessDeniedException accessDeniedException) throws ServletException {
        try {
            // System.out.println("Custom" + "false");
            ServletUtils.setResponse(response,
                    systemResourcePacker.packErrors(HttpStatus.UNAUTHORIZED,
                            LocaleI18nUtils.getString(BaseErrorConstants.NO_PERMISSION), ErrorCode.NO_PERMISSION.errorCode(),
                            LocaleI18nUtils.getString(ErrorCode.NO_PERMISSION.errorMsg())));
        } catch (Exception e) {
            throw new ServletException();
        }
    }

}
