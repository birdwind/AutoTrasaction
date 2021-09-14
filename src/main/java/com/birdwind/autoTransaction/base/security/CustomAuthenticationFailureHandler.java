package com.birdwind.autoTransaction.base.security;

import com.birdwind.autoTransaction.base.enums.ErrorCode;
import com.birdwind.autoTransaction.base.system.converter.SystemResourcePacker;
import com.birdwind.autoTransaction.base.utils.LocaleI18nUtils;
import com.birdwind.autoTransaction.base.utils.ServletUtils;
import com.birdwind.autoTransaction.constans.MemberErrorConstantsEnums;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;
import org.springframework.stereotype.Component;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Component
public class CustomAuthenticationFailureHandler implements AuthenticationFailureHandler {

    @Autowired
    private SystemResourcePacker systemResourcePacker;

    // @Autowired
    // private SystemLogService systemLogService;

    @Override
    public void onAuthenticationFailure(HttpServletRequest request, HttpServletResponse response,
                                        AuthenticationException exception) {
        try {
            response.setCharacterEncoding("UTF-8");
            ServletUtils.setResponse(response,
                    systemResourcePacker.packErrors(HttpStatus.UNAUTHORIZED,
                            LocaleI18nUtils.getString(MemberErrorConstantsEnums.MEMBER_LOGIN_NOT_FOUND.valueOfName()), ErrorCode.LOGIN_ERROR.errorCode(),
                            ErrorCode.LOGIN_ERROR.errorMsg()));

        } catch (IOException e) {
            e.printStackTrace();
        }
        // systemLogService.setResponseAndLog(response,
        // systemResourcePacker.packErrors(HttpStatus.FORBIDDEN, exception.getMessage()));
    }

}
