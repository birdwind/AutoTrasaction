package com.birdwind.springBootInit.controller.system;

import org.springframework.boot.web.servlet.error.ErrorController;

import com.birdwind.springBootInit.base.exception.BaseThrowable;
import com.birdwind.springBootInit.base.system.converter.SystemResourcePacker;
import com.birdwind.springBootInit.base.utils.ServletUtils;
import com.birdwind.springBootInit.base.view.ErrorPageView;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.web.servlet.error.ErrorController;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;
import javax.servlet.RequestDispatcher;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Optional;

@Controller
public class ErrorPageController implements ErrorController {

    @Autowired
    private SystemResourcePacker systemResourcePacker;

    // 處理由handleError跳轉過來的request
    @GetMapping(value = {"/errors"})
    public String displayError(HttpServletRequest httpServletRequest, ModelMap modelMap) {
        httpServletRequest.setAttribute("error",
                Optional.ofNullable(modelMap.get("errorView")).orElse(new ErrorPageView(HttpStatus.INTERNAL_SERVER_ERROR,
                        (String) httpServletRequest.getAttribute(RequestDispatcher.FORWARD_REQUEST_URI))));
        // 回應在errorPage目錄下，相對應的錯誤代碼頁面
        return "/rbac/errorPage/error";
    }

    // 處理有錯誤代號的請求，像是404, 412, 403...等
    @GetMapping(value = {"/error"})
    public String handleGetError(HttpServletRequest request, HttpServletResponse response,
                                 RedirectAttributes redirectAttributes) throws IOException {
        String url = (String) request.getAttribute(RequestDispatcher.FORWARD_REQUEST_URI);
        Optional<Integer> statusOptional =
                Optional.ofNullable((Integer) request.getAttribute(RequestDispatcher.ERROR_STATUS_CODE));
        String error = (String) request.getAttribute("error");
        BaseThrowable cause = (BaseThrowable) request.getAttribute("cause");

        if (ServletUtils.isApi(url)) {
            HttpStatus status = Optional.ofNullable(cause).map(BaseThrowable::getHttpStatus)
                    .orElse(HttpStatus.valueOf(statusOptional.orElse(500)));
            ServletUtils.setResponse(response,
                    systemResourcePacker.packErrors(status, Optional.ofNullable(error).orElse(status.getReasonPhrase())));
            return null;
        }

        // 如果有錯誤的http status code，將錯誤代碼寫入一次性的session中
        statusOptional.ifPresent(status -> {
            redirectAttributes.addFlashAttribute("errorView",
                    new ErrorPageView(HttpStatus.valueOf(Integer.parseInt(status.toString())), url,
                            Optional.ofNullable((BaseThrowable) request.getAttribute("cause")).orElse(null)));
            redirectAttributes.addFlashAttribute("statusCode", Integer.parseInt(status.toString()));
            request.setAttribute("statusCode", Integer.parseInt(status.toString()));
        });

        // 因為要使用sitemesh template來裝飾錯誤畫面，所以還需重新導向至/errors
        return "redirect:/errors";
    }

    @Override
    public String getErrorPath() {
        return "/rbac/page/error";
    }

}
