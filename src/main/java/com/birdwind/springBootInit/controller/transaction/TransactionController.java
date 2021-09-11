package com.birdwind.springBootInit.controller.transaction;

import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping(value = {"/page/transaction"})
public class TransactionController {

    @GetMapping(value = {"", "/"})
    public String home() {
        return "/ecr/transaction/grid";
    }

    @GetMapping(value = {"/form", "/form/"})
    public String createOrUpdate(ModelMap modelMap) {
        // modelMap.addAttribute("uuid",
        // Optional.ofNullable(beamCore).map(BeamCore::getBeamCoreUuid).orElse(StringUtils.EMPTY));

        return "/ecr/transaction/form";
    }
}
