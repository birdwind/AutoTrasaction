package com.birdwind.autoTransaction.controller.member;

import com.birdwind.autoTransaction.base.annotation.AuthForm;
import com.birdwind.autoTransaction.base.view.filter.FilterForm;
import com.birdwind.autoTransaction.base.view.filter.SearchCondition;
import com.birdwind.autoTransaction.base.view.filter.converter.FilterFormConverter;
import com.birdwind.autoTransaction.entity.model.Member;
import com.birdwind.autoTransaction.entity.service.MemberService;
import com.birdwind.autoTransaction.entityFieldFilter.MemberEntityFieldFilter;
import com.birdwind.autoTransaction.enums.RoleEnum;
import com.birdwind.autoTransaction.view.member.MemberCreateForm;
import com.birdwind.autoTransaction.view.member.MemberResource;
import com.birdwind.autoTransaction.view.member.converter.MemberCreateFormConverter;
import com.birdwind.autoTransaction.view.member.converter.MemberPageGridConverter;
import com.birdwind.autoTransaction.view.member.converter.MemberResourcePacker;
import com.birdwind.autoTransaction.view.member.converter.MemberTemplateConverter;
import com.birdwind.autoTransaction.view.member.converter.MemberViewConverter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import javax.transaction.Transactional;
import javax.validation.Valid;

@RestController
@RequestMapping(value = "/api/member")
public class MemberApiController {

    @Autowired
    private MemberResourcePacker memberResourcePacker;

    @Autowired
    private MemberPageGridConverter memberPageGridConverter;

    @Autowired
    private MemberTemplateConverter memberTemplateConverter;

    @Autowired
    private MemberViewConverter memberViewConverter;

    @Autowired
    private MemberCreateFormConverter memberCreateFormConverter;

    @Autowired
    private MemberService memberService;

    private final FilterFormConverter<Member> memberFilterFormConverter =
        new FilterFormConverter<>(MemberEntityFieldFilter.class);

    @PostMapping(value = {"/grid", "/grid/"})
    public MemberResource grid(@RequestPart(value = "filter", required = false) FilterForm filterForm) {
        SearchCondition<Member> searchCondition = memberFilterFormConverter.convert(filterForm);
        return memberResourcePacker.pack(memberPageGridConverter.convertToPageGrid(
            memberService.getMemberBySearchConditionAndRoleId(searchCondition, RoleEnum.MEMBER.id())));
    }

    @GetMapping(value = {"/template", "/template/"})
    public MemberResource getCreateTemplate() {
        return memberResourcePacker.pack(memberTemplateConverter.convert(memberViewConverter.convert(new Member())));
    }

    @Transactional
    @PutMapping(value = {"", "/"})
    public MemberResource create(@AuthForm @Valid @RequestPart("member") MemberCreateForm form) {
        Member member = memberCreateFormConverter.convert(form);
        member = memberService.save(member, form.getRole());
        return memberResourcePacker.pack(memberViewConverter.convert(member));
    }

}
