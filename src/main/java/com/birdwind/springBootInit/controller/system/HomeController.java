package com.birdwind.springBootInit.controller.system;

import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.servlet.ModelAndView;

@Configuration
@EnableScheduling
@Controller
public class HomeController {

    @GetMapping(value = {"", "/", "/index", "/index/", "/home", "/home/"})
    public String index(ModelAndView modelAndView) {
        // SystemUser systemUser = (SystemUser) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        // if (systemUser.getAuthorities().contains(Authority.SUPER_ADMIN)
        // || systemUser.getAuthorities().contains(Authority.ADMIN)) {
        // return "redirect:/page/transaction";
        // } else {
        // return "redirect:/page/investors/earning";
        // }
        // LMS 系統
        return "/ecr/home";
        // 桌邊驗布系統
        // return "/wayson/LmsSearch";
    }

}
