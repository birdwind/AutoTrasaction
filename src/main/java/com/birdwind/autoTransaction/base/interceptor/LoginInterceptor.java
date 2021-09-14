package com.birdwind.autoTransaction.base.interceptor;

import com.birdwind.autoTransaction.base.constans.BaseErrorConstants;
import com.birdwind.autoTransaction.base.enums.ErrorCode;
import com.birdwind.autoTransaction.base.security.model.SystemUser;
import com.birdwind.autoTransaction.base.system.converter.SystemResourcePacker;
import com.birdwind.autoTransaction.base.utils.LocaleI18nUtils;
import com.birdwind.autoTransaction.base.utils.ServletUtils;
import com.birdwind.autoTransaction.entity.model.Member;
import com.birdwind.autoTransaction.entity.service.MemberService;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@Component
public class LoginInterceptor implements HandlerInterceptor {

    @Autowired
    private MemberService memberService;

    @Autowired
    private SystemResourcePacker systemResourcePacker;

    // 預載判斷,若false則不進入程式
    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler)
            throws Exception {

        String code = BaseErrorConstants.EXPIRED_SESSION;
        Member member = SystemUser.getMember();
        if (member == null) {
            code = BaseErrorConstants.NOT_LOGIN;
        } else {
            String session = member.getSession();
            // 無法以session找到memberCore代表當前未登入或是session過期
            if (memberService.getMemberCoreBySession(session).isPresent()) {
                return true;
            }
        }
        if (ServletUtils.isApi(request)) {
            ServletUtils.setResponse(response, systemResourcePacker.packErrors(HttpStatus.UNAUTHORIZED,
                    LocaleI18nUtils.getString(code), ErrorCode.NOT_LOGIN.errorCode(), ErrorCode.NOT_LOGIN.errorMsg()));

            // systemLogService.setResponseAndLog(response,
            // systemResourcePacker.packErrors(HttpStatus.UNAUTHORIZED, LocaleI18nUtils.getString(code)));
        } else if (StringUtils.equals(request.getMethod(), "GET")) {
            response.sendRedirect("/logout");
        }


        return false;
    }

    // 進入後則可做動作
    @Override
    public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler,
                           ModelAndView modelAndView) throws Exception {
    }

    // 做完所有動作之後再做
    @Override
    public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex)
            throws Exception {

    }
}
