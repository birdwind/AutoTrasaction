package com.birdwind.springBootInit.base.interceptor;

import com.birdwind.springBootInit.base.constans.BaseErrorConstants;
import com.birdwind.springBootInit.base.enums.ErrorCode;
import com.birdwind.springBootInit.base.security.model.CheckAuthority;
import com.birdwind.springBootInit.base.security.model.SystemUser;
import com.birdwind.springBootInit.base.system.converter.SystemResourcePacker;
import com.birdwind.springBootInit.base.utils.LocaleI18nUtils;
import com.birdwind.springBootInit.base.utils.ServletUtils;
import com.birdwind.springBootInit.base.view.abstracts.AbstractResource;
import com.google.common.collect.Lists;
import org.apache.commons.lang3.RegExUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.PermissionDeniedDataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.method.HandlerMethod;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;
import java.io.IOException;
import java.util.List;
import java.util.Optional;
import java.util.regex.Pattern;
import java.util.stream.Collectors;
import java.util.stream.Stream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@Component
public class FunctionOperatorInterceptor implements HandlerInterceptor {

    private Pattern pattern = Pattern.compile("[{][^{]*[}]");

    // @Autowired
    // private SystemLogService systemLogService;

    @Autowired
    private SystemResourcePacker systemResourcePacker;

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler)
        throws IOException {
        // 登入的帳號為 SUPER_ADMIN 則直接通過
        if (CheckAuthority.isSuperAdmin()) {
            return true;
        }

        HandlerMethod method = null;

        try {
            method = (HandlerMethod) handler;
        } catch (Exception e) {
            responseError(request, response, true);
            return false;
        }

        // 取得 class level requestMapping 路由
        List<String> prefixes = Optional.ofNullable(method.getMethod().getDeclaringClass())
            .map(clazz -> clazz.getDeclaredAnnotation(RequestMapping.class)).map(RequestMapping::value)
            .map(Lists::newArrayList).orElse(Lists.newArrayList());
        // 取得 method level requestMapping 路由
        List<String> values = Optional.ofNullable(method.getMethodAnnotation(RequestMapping.class))
            .map(RequestMapping::value).map(Lists::newArrayList)
            .orElseThrow(() -> new PermissionDeniedDataAccessException("no permission", new Exception()));
        // cross join
        List<String> urls = values.stream()
            .flatMap(value -> prefixes.isEmpty() ? Stream.of(value) : prefixes.stream().map(prefix -> prefix + value))
            .map(value -> request.getMethod() + " - " + RegExUtils.replaceAll(value, pattern, "*"))
            .collect(Collectors.toList());

        SystemUser systemUser = SystemUser.getCurrentUser();
        if (urls.stream().anyMatch(url -> systemUser.getUrls().contains(url))) {
            return true;
        }

        responseError(request, response, false);

        return false;
    }

    @Override
    public void postHandle(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse,
        Object handler, ModelAndView modelAndView) {}

    @Override
    public void afterCompletion(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse,
        Object handler, Exception exception) {}

    private void responseError(HttpServletRequest request, HttpServletResponse response, boolean notFound) {
        if (ServletUtils.isApi(request)) {
            // systemLogService.setResponseAndLog(response, getApiError(notFound));
            try {
                ServletUtils.setResponse(response, getApiError(notFound));
            } catch (IOException e) {
                e.printStackTrace();
            }
        } else {
            throwError(notFound);
        }
    }

    private AbstractResource getApiError(boolean notFound) {
        if (notFound) {
            return systemResourcePacker.packErrors(HttpStatus.NOT_FOUND,
                LocaleI18nUtils.getString(BaseErrorConstants.RESOURCE_NOT_FOUND),
                ErrorCode.RESOURCE_NOTFOUND.errorCode(), ErrorCode.RESOURCE_NOTFOUND.errorMsg());
        } else {
            return systemResourcePacker.packErrors(HttpStatus.FORBIDDEN,
                LocaleI18nUtils.getString(BaseErrorConstants.NO_PERMISSION), ErrorCode.NO_PERMISSION.errorCode(),
                ErrorCode.NO_PERMISSION.errorMsg());
        }
    }

    private void throwError(boolean notFound) {
        if (notFound) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND,
                LocaleI18nUtils.getString(BaseErrorConstants.PAGE_NOT_FOUND));
        } else {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN,
                LocaleI18nUtils.getString(BaseErrorConstants.NO_PERMISSION));
        }
    }

}
