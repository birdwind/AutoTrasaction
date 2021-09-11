package com.birdwind.springBootInit.controller.personal;


import com.birdwind.springBootInit.base.view.filter.FilterForm;
import com.birdwind.springBootInit.base.view.filter.SearchCondition;
import com.birdwind.springBootInit.entity.model.Member;
import com.birdwind.springBootInit.enums.RoleEnum;
import com.birdwind.springBootInit.view.member.MemberResource;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/api/me")
public class PersonalApiController {

//    @PostMapping(value = {"/grid", "/grid/"})
//    public MemberResource grid(@RequestPart(value = "filter", required = false) FilterForm filterForm) {
//
//    }
}
