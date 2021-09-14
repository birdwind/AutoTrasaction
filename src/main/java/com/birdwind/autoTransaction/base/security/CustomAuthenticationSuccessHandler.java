package com.birdwind.autoTransaction.base.security;

import com.birdwind.autoTransaction.base.enums.OperatorMethod;
import com.birdwind.autoTransaction.base.enums.OperatorType;
import com.birdwind.autoTransaction.base.security.model.SystemUser;
import com.birdwind.autoTransaction.base.security.view.converter.LoginViewConverter;
import com.birdwind.autoTransaction.base.system.converter.SystemResourcePacker;
import com.birdwind.autoTransaction.base.utils.CipherUtils;
import com.birdwind.autoTransaction.base.utils.LocaleI18nUtils;
import com.birdwind.autoTransaction.base.utils.ServletUtils;
import com.birdwind.autoTransaction.constans.MemberErrorConstantsEnums;
import com.birdwind.autoTransaction.entity.model.Member;
import com.birdwind.autoTransaction.entity.service.FunctionOperatorRelateService;
import com.birdwind.autoTransaction.entity.service.MemberService;
import com.birdwind.autoTransaction.view.function.FunctionView;
import com.birdwind.autoTransaction.view.module.ModuleView;
import com.birdwind.autoTransaction.base.system.ModuleAuthView;
import com.birdwind.autoTransaction.base.system.converter.ModuleAuthViewConverter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;
import java.io.IOException;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@Component
public class CustomAuthenticationSuccessHandler implements AuthenticationSuccessHandler {

    @Autowired
    private MemberService memberService;

    @Autowired
    private SystemResourcePacker systemResourcePacker;

    @Autowired
    private LoginViewConverter loginViewConverter;

    @Autowired
    private ModuleAuthViewConverter moduleAuthViewConverter;

    @Autowired
    private FunctionOperatorRelateService functionOperatorRelateService;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
        Authentication authentication) throws IOException {
        SystemUser systemUser = (SystemUser) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        Member member =
            memberService.getMemberByUsername(systemUser.getUsername()).orElseThrow(() -> new BadCredentialsException(
                LocaleI18nUtils.getString(MemberErrorConstantsEnums.MEMBER_LOGIN_NOT_FOUND.valueOfName())));

        String sessionString = CipherUtils.bcrypt(member.getMemberId().toString());

        ModuleAuthView moduleAuthView = moduleAuthViewConverter.convert(member);

        Set<Integer> functionIds = moduleAuthView.getModules().stream().map(ModuleView::getFunction)
            .flatMap(List::stream).mapToInt(FunctionView::getFunctionId).boxed().collect(Collectors.toSet());

        // 根據 function, operator, function_operator_relate 3張表格
        // 產生該帳號能夠存取的 URL
        // URL 格式如下: GET - /page/member/form, PUT - /api/member/, POST - /api/member/
        Set<String> urls =
            functionOperatorRelateService.getFunctionOperatorRelatesByFunctionIds(functionIds).parallelStream()
                .map(relate -> OperatorMethod.getName(relate.getOperator().getMethod()) + " - "
                    + OperatorType.getUrl(relate.getOperator().getType()) + relate.getFunction().getBackUrl()
                    + relate.getOperator().getUrl())
                .collect(Collectors.toSet());

        memberService.updateSession(sessionString, member.getMemberId());
        member.setSession(sessionString);
        systemUser.setSession(sessionString);
        systemUser.setCore(member);
        systemUser.setSideMenu(moduleAuthView);
        systemUser.setUrls(urls);

        // String res = systemUser.getUsername() + " Login Success";
        // systemLogService.setResponseAndLog(response, systemResourcePacker.packErrors(HttpStatus.OK, res));
        // ServletUtils.setResponse(response, systemResourcePacker.packErrors(HttpStatus.OK, res));
        ServletUtils.setResponse(response, systemResourcePacker.pack(loginViewConverter.convert(member)));
    }

}
