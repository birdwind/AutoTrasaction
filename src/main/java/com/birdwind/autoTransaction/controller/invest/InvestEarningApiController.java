package com.birdwind.autoTransaction.controller.invest;

import com.birdwind.autoTransaction.base.view.filter.FilterForm;
import com.birdwind.autoTransaction.base.view.filter.SearchCondition;
import com.birdwind.autoTransaction.base.view.filter.converter.FilterFormConverter;
import com.birdwind.autoTransaction.entity.model.Member;
import com.birdwind.autoTransaction.entity.service.MemberService;
import com.birdwind.autoTransaction.entityFieldFilter.InvestEarningEntityFieldFilter;
import com.birdwind.autoTransaction.enums.RoleEnum;
import com.birdwind.autoTransaction.view.invest.earning.InvestEarningResource;
import com.birdwind.autoTransaction.view.invest.earning.converter.InvestEarningPageGridConverter;
import com.birdwind.autoTransaction.view.invest.earning.converter.InvestEarningResourcePacker;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/api/investors/earning")
public class InvestEarningApiController {

    @Autowired
    private InvestEarningResourcePacker investEarningResourcePacker;

    @Autowired
    private InvestEarningPageGridConverter investEarningPageGridConverter;

    @Autowired
    private MemberService memberService;

    private final FilterFormConverter<Member> investEarningEntityFieldFilterConverter =
        new FilterFormConverter<>(InvestEarningEntityFieldFilter.class);

    @PostMapping(value = {"/grid", "/grid/"})
    public InvestEarningResource depositGrid(@RequestPart(value = "filter", required = false) FilterForm filterForm) {
        SearchCondition<Member> searchCondition = investEarningEntityFieldFilterConverter.convert(filterForm);
        return investEarningResourcePacker.pack(investEarningPageGridConverter.convertToPageGrid(
            memberService.getMemberBySearchConditionAndRoleId(searchCondition, RoleEnum.MEMBER.id())));
    }
}
