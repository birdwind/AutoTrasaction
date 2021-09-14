package com.birdwind.autoTransaction.base.utils;

import com.google.gson.Gson;
import com.birdwind.autoTransaction.base.enums.OperatorMethod;
import com.birdwind.autoTransaction.base.view.abstracts.AbstractResource;
import org.apache.commons.lang3.StringUtils;
import org.springframework.http.HttpStatus;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.Optional;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import eu.bitwalker.useragentutils.UserAgent;

public class ServletUtils {

    private final static String API_REGEX = "/api/.*";

    public static void setRequestAttribute(String name, Object value) {
        getRequest().ifPresent(request -> request.setAttribute(name, value));
    }

    @SuppressWarnings("unchecked")
    public static <T> T getAndRemoveRequestAttribute(String name) {
        try {
            return getRequest().map(request -> {
                T value = (T) request.getAttribute(name);
                request.removeAttribute(name);
                return value;
            }).orElse(null);
        } catch (NullPointerException | ClassCastException e) {
            return null;
        }
    }

    public static Optional<HttpServletRequest> getRequest() {
        ServletRequestAttributes attributes = (ServletRequestAttributes) RequestContextHolder.getRequestAttributes();

        return Optional.ofNullable(attributes).map(ServletRequestAttributes::getRequest);
    }

    public static Optional<HttpServletResponse> getResponse() {
        ServletRequestAttributes attributes = (ServletRequestAttributes) RequestContextHolder.getRequestAttributes();

        return Optional.ofNullable(attributes).map(ServletRequestAttributes::getResponse);
    }

    public static String getRequestUrl() {
        return getRequest().map(request -> request.getRequestURL().toString()).orElse(StringUtils.EMPTY);
    }

    public static boolean isApi() {
        return getRequest().map(HttpServletRequest::getRequestURI).map(uri -> uri.matches(API_REGEX)).orElse(false);
    }

    public static boolean isApi(HttpServletRequest request) {
        return request.getRequestURI().matches(API_REGEX);
    }

    public static boolean isApi(String url) {
        return url.matches(API_REGEX);
    }

    public static boolean isCreate() {
        try {
            return getRequest().map(HttpServletRequest::getMethod).map(OperatorMethod.CREATE::equals).orElse(false);
        } catch (IllegalArgumentException e) {
            return false;
        }
    }

    public static boolean isUpdate() {
        try {
            return getRequest().map(HttpServletRequest::getMethod).map(OperatorMethod.UPDATE::equals).orElse(false);
        } catch (IllegalArgumentException e) {
            return false;
        }
    }

    public static boolean isDelete() {
        try {
            return getRequest().map(HttpServletRequest::getMethod).map(OperatorMethod.DELETE::equals).orElse(false);
        } catch (IllegalArgumentException e) {
            return false;
        }
    }

    public static String getCurrentMethod() {
        try {
            return getRequest().map(HttpServletRequest::getMethod).orElse(null);
        } catch (IllegalArgumentException e) {
            return null;
        }
    }

    // [Device Type] - [OS] - [Browser] - [Browser Version]
    public static String getCurrentDevice() {
        try {
            UserAgent userAgent = UserAgent
                .parseUserAgentString(getRequest().map(r -> r.getHeader("User-Agent")).orElse("UNKNOWN DEVICE"));
            return userAgent.getOperatingSystem().getDeviceType().getName() + " - "
                + userAgent.getOperatingSystem().getManufacturer().getName() + " "
                + userAgent.getOperatingSystem().getName() + " - " + userAgent.getBrowser().getName() + " - "
                + userAgent.getBrowserVersion().getVersion();
        } catch (Exception e) {
            return "UNKNOWN DEVICE";
        }
    }

    // http or https
    public static String getIsSecure() {
        return getRequest().map(HttpServletRequest::isSecure).map(s -> s ? "https://" : "http://")
            .orElse(StringUtils.EMPTY);
    }

    public static String getServerName() {
        return getRequest().map(HttpServletRequest::getServerName).orElse(StringUtils.EMPTY);
    }

    public static Integer getServerPort() {
        return getRequest().map(HttpServletRequest::getServerPort).orElse(80);
    }

    public static String getServerFullAddr() {
        return getIsSecure() + (getServerPort() == 80 ? getServerName() : getServerName() + ":" + getServerPort());
    }

    public static String getClientIp() {
        return getRequest().map(HttpServletRequest::getRemoteAddr).orElse(StringUtils.EMPTY);
    }

    public static void setResponse(HttpServletResponse response, AbstractResource resource) throws IOException {
        writer(response, resource);
    }

    private static void writer(HttpServletResponse response, AbstractResource resource) throws IOException {
        PrintWriter out = response.getWriter();
        response.setStatus(HttpStatus.OK.value());
        response.setContentType("application/json; charset=UTF-8");
        response.setCharacterEncoding("UTF-8");
        out.print(new Gson().toJson(resource));
        out.flush();
    }

}
