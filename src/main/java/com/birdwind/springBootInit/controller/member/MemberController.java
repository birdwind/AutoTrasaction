package com.birdwind.springBootInit.controller.member;

import com.birdwind.springBootInit.entity.model.Member;
import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import java.util.Optional;

@Controller
@RequestMapping(value = {"/page/member"})
public class MemberController {

    @GetMapping(value = {"", "/"})
    public String home() {
        return "/ecr/member/grid";
    }

    @GetMapping(value = {"/form", "/form/", "/form/{memberUuid}", "/form/{memberUuid}/"})
    public String createOrUpdate(Member member, ModelMap modelMap) {
         modelMap.addAttribute("memberUuid",
         Optional.ofNullable(member).map(Member::getMemberUuid).orElse(StringUtils.EMPTY));

        return "/ecr/member/form";
    }
}
