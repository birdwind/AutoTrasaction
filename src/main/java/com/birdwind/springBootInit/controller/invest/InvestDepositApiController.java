package com.birdwind.springBootInit.controller.invest;

import com.birdwind.springBootInit.aop.validater.InvestFormValidator;
import com.birdwind.springBootInit.base.annotation.AuthForm;
import com.birdwind.springBootInit.base.view.filter.FilterForm;
import com.birdwind.springBootInit.base.view.filter.SearchCondition;
import com.birdwind.springBootInit.base.view.filter.converter.FilterFormConverter;
import com.birdwind.springBootInit.entity.model.Invest;
import com.birdwind.springBootInit.entity.model.Transaction;
import com.birdwind.springBootInit.entity.service.FundsService;
import com.birdwind.springBootInit.entity.service.InvestService;
import com.birdwind.springBootInit.entity.service.InvestTypeService;
import com.birdwind.springBootInit.entity.service.MemberService;
import com.birdwind.springBootInit.entity.service.TransactionService;
import com.birdwind.springBootInit.entityFieldFilter.InvestDepositEntityFieldFilter;
import com.birdwind.springBootInit.enums.RoleEnum;
import com.birdwind.springBootInit.view.invest.deposit.InvestDepositCreateForm;
import com.birdwind.springBootInit.view.invest.deposit.InvestDepositResource;
import com.birdwind.springBootInit.view.invest.deposit.InvestDepositUpdateForm;
import com.birdwind.springBootInit.view.invest.deposit.InvestDepositView;
import com.birdwind.springBootInit.view.invest.deposit.converter.InvestDepositCreateFormConverter;
import com.birdwind.springBootInit.view.invest.deposit.converter.InvestDepositPageGridConverter;
import com.birdwind.springBootInit.view.invest.deposit.converter.InvestDepositResourcePacker;
import com.birdwind.springBootInit.view.invest.deposit.converter.InvestDepositTemplateConverter;
import com.birdwind.springBootInit.view.invest.deposit.converter.InvestDepositUpdateFormConverter;
import com.birdwind.springBootInit.view.invest.deposit.converter.InvestDepositViewConverter;
import com.birdwind.springBootInit.view.invest.deposit.converter.InvestTypeListConverter;
import com.birdwind.springBootInit.view.member.converter.MemberListItemConverter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.WebDataBinder;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.InitBinder;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;
import javax.transaction.Transactional;
import javax.validation.Valid;

@RestController
@RequestMapping(value = "/api/investors/deposit")
public class InvestDepositApiController {

    @Autowired
    private InvestDepositResourcePacker investDepositResourcePacker;

    @Autowired
    private InvestService investService;

    @Autowired
    private InvestTypeService investTypeService;

    @Autowired
    private MemberService memberService;

    @Autowired
    private TransactionService transactionService;

    @Autowired
    private InvestDepositPageGridConverter investDepositPageGridConverter;

    @Autowired
    private InvestDepositTemplateConverter investDepositTemplateConverter;

    @Autowired
    private InvestDepositCreateFormConverter investDepositCreateFormConverter;

    @Autowired
    private InvestDepositUpdateFormConverter investDepositUpdateFormConverter;

    @Autowired
    private InvestTypeListConverter investTypeListConverter;

    @Autowired
    private InvestDepositViewConverter investDepositViewConverter;

    @Autowired
    private MemberListItemConverter memberListItemConverter;

    @Autowired
    private InvestFormValidator investFormValidator;

    private final FilterFormConverter<Invest> investEntityFieldFilterConverter =
        new FilterFormConverter<>(InvestDepositEntityFieldFilter.class);

    // bind validator
    @InitBinder(value = "invest")
    public void bindOperatorForm(WebDataBinder binder) {
        binder.addValidators(investFormValidator);
    }

    @PostMapping(value = {"/grid", "/grid/"})
    public InvestDepositResource depositGrid(@RequestPart(value = "filter", required = false) FilterForm filterForm) {
        SearchCondition<Invest> searchCondition = investEntityFieldFilterConverter.convert(filterForm);
        return investDepositResourcePacker.pack(investDepositPageGridConverter
            .convertToPageGrid(investService.getInvestBySearchCondition(searchCondition)));
    }

    @GetMapping(value = {"/template", "/template/"})
    public InvestDepositResource getCreateTemplate() {
        return investDepositResourcePacker
            .pack(investDepositTemplateConverter.convert(investDepositViewConverter.convert(new Invest())));
    }

    @Transactional
    @PutMapping(value = {"", "/"})
    public InvestDepositResource create(
        @AuthForm @Valid @RequestPart("invest") InvestDepositCreateForm investDepositCreateForm) {
        Invest invest = investDepositCreateFormConverter.convert(investDepositCreateForm);
        if(invest.getInvestType().getId() == 2){
            List<Transaction> transactionList = transactionService.getTransactionInLaveLargeZeroByMember(investDepositCreateForm.getMember());

            //TODO:出金
        }
        invest = investService.save(invest, investDepositCreateForm.getMember());
        return investDepositResourcePacker.pack(investDepositViewConverter.convert(invest));
    }

    @GetMapping(value = {"/template/{investUuid}", "/template/{investUuid}/"})
    public InvestDepositResource getUpdateTemplate(@PathVariable("investUuid") Invest invest) {
        InvestDepositView investDepositView = investDepositViewConverter.convert(invest);
        return investDepositResourcePacker.pack(investDepositTemplateConverter.convert(investDepositView));
    }

    @Transactional
    @PostMapping(value = {"", "/"})
    public InvestDepositResource update(
        @AuthForm @Valid @RequestPart("invest") InvestDepositUpdateForm investDepositUpdateForm) {
        Invest invest = investDepositUpdateFormConverter.convert(investDepositUpdateForm);
        return investDepositResourcePacker.pack(investDepositViewConverter.convert(investService.save(invest)));
    }

//    @DeleteMapping(value = {"/{investUuid}", "/{investUuid}/"})
//    public InvestDepositResource delete(@PathVariable("investUuid") Invest invest) {
//        fundsService.getAllFundsAmountSum();
//        List<Transaction> transactionList = transactionService.getAllTransaction();
//
//        return investDepositResourcePacker.pack(investDepositViewConverter.convert(investService.save(invest)));
//    }

    @GetMapping(value = {"/list", "/list/"})
    public InvestDepositResource getInvestTypeListItem() {
        return investDepositResourcePacker.pack(investTypeListConverter.convert(investTypeService.getAllInvestType()));
    }

    @GetMapping(value = {"/list/member", "/list/member/"})
    public InvestDepositResource getMemberList() {
        return investDepositResourcePacker
            .pack(memberListItemConverter.convert(memberService.getMemberCoreByRoleId(RoleEnum.MEMBER.id())));
    }
}
