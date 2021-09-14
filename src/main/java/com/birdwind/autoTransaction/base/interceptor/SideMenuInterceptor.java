package com.birdwind.autoTransaction.base.interceptor;

import com.birdwind.autoTransaction.base.security.model.SystemUser;
import com.birdwind.autoTransaction.base.system.ModuleAuthView;
import com.birdwind.autoTransaction.entity.model.Member;
import com.google.gson.Gson;
import org.apache.commons.lang3.StringUtils;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@Component
public class SideMenuInterceptor implements HandlerInterceptor {

    @Override
    public boolean preHandle(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse,
        Object handler) {
        return httpServletResponse.getStatus() == HttpStatus.OK.value();
    }

    @Override
    public void postHandle(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse,
        Object handler, ModelAndView modelAndView) {
        if (StringUtils.equals(httpServletRequest.getMethod(), "GET") && modelAndView != null) {
            SystemUser systemUser = SystemUser.getCurrentUser();
            Member member = (Member) SystemUser.getMember();
            ModuleAuthView moduleAuthView = systemUser.getSideMenu();
            modelAndView.getModel().put("sideMenu", new Gson().toJson(moduleAuthView));
            modelAndView.getModel().put("nickName", new Gson()
                .toJson(member.getNickname() != null ? member.getNickname() : member.getName()));
            modelAndView.getModel().put("investTotal", new Gson().toJson(member.getFundsMemberRelate().getFunds().getAmount()));
        }
    }

    @Override
    public void afterCompletion(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse,
        Object handler, Exception exception) {}

}
