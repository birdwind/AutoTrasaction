package com.birdwind.springBootInit.controller.system;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.support.SessionStatus;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;

@Controller
public class LoginController {

    @GetMapping(value = "/login")
    public String login() {
        return "/rbac/login";
    }

    @GetMapping(value = "/loginSuccessfully")
    public String loginSuccessfully() {
        return "redirect:/page/transaction";
    }

    @GetMapping(value = "/logoutSuccessfully")
    public String logoutSuccessfully(HttpServletRequest httpServletRequest, SessionStatus status)
            throws ServletException {
        httpServletRequest.logout();
        status.setComplete();
        return "redirect:/login";
    }
}
