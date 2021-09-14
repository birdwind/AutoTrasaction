package com.birdwind.autoTransaction.controller.invest;

import com.birdwind.autoTransaction.entity.model.Invest;
import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.Optional;

@Controller
@RequestMapping(value = {"/page/investors"})
public class InvestController {

    @GetMapping(value = {"/earning", "/earning/"})
    public String earning() {
        return "/ecr/invest/earnings/grid";
    }

    @GetMapping(value = {"/deposit", "/deposit/"})
    public String deposit() {
        return "/ecr/invest/deposit/grid";
    }

    @GetMapping(value = {"/deposit/form", "/deposit/form/", "/deposit/form/{investUuid}", "/deposit/form/{investUuid}/"})
    public String createOrUpdate(@PathVariable(value = "investUuid", required = false) Invest invest, ModelMap modelMap){
        modelMap.addAttribute("uuid",
                Optional.ofNullable(invest).map(Invest::getInvestUuid).orElse(StringUtils.EMPTY));
        return "/ecr/invest/deposit/form";
    }

}
