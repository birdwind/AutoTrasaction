package com.birdwind.springBootInit.aop.aspect;

import com.birdwind.springBootInit.base.aop.CreateUpdateFormAspect;
import com.birdwind.springBootInit.base.exception.EntityNotFoundException;
import com.birdwind.springBootInit.constans.InvestErrorConstants;
import com.birdwind.springBootInit.entity.model.Invest;
import com.birdwind.springBootInit.entity.model.InvestType;
import com.birdwind.springBootInit.entity.model.Member;
import com.birdwind.springBootInit.entity.service.InvestService;
import com.birdwind.springBootInit.entity.service.InvestTypeService;
import com.birdwind.springBootInit.entity.service.MemberService;
import com.birdwind.springBootInit.entity.utils.FundsUtils;
import com.birdwind.springBootInit.view.invest.deposit.InvestDepositCreateForm;
import com.birdwind.springBootInit.view.invest.deposit.InvestDepositUpdateForm;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.validation.BindingResult;

@Component
public class InvestDepositFormAspect extends CreateUpdateFormAspect<InvestDepositCreateForm, InvestDepositUpdateForm> {

    @Autowired
    private InvestTypeService investTypeService;

    @Autowired
    private MemberService memberService;

    @Autowired
    private InvestService investService;

    @Autowired
    private FundsUtils fundsUtils;

    @Override
    protected void putAuthenticate(InvestDepositCreateForm form, BindingResult errors) throws EntityNotFoundException {
        // TODO:檢查資金庫
        InvestType investType =
            investTypeService.getInvestTypeByInvestTypeUuid(form.getInvestTypeUuid()).orElse(null);
        if (investType == null) {
            errors.rejectValue("investTypeUuid", InvestErrorConstants.INVEST_TYPE_NOT_FOUND);
        } else {
            form.setInvestType(investType);
        }

        if(investType.getId() == 2){
            errors.rejectValue("investTypeUuid", "出金功能暫不開放");
        }

        if(investType.getId() == 2){
            if(!fundsUtils.isFundsHaveLave(form.getAmount())){

            }
        }

        Member member = memberService.getMemberByMemberUuid(form.getMemberUuid()).orElse(new Member());
        if (member.getId() == 0) {
            errors.rejectValue("memberUuid", InvestErrorConstants.INVEST_MEMBER_NOT_FOUND);
        } else {
            form.setMember(member);
        }
    }

    @Override
    protected void postAuthenticate(InvestDepositUpdateForm form, BindingResult errors) throws EntityNotFoundException {
        Invest invest = investService.getInvestByInvestUuid(form.getInvestUuid())
            .orElseThrow(() -> new EntityNotFoundException("functionUuid", InvestErrorConstants.INVEST_NOT_FOUND));

        form.setInvest(invest);

    }
}
