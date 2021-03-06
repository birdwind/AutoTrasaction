package com.birdwind.autoTransaction.base.security;

import com.birdwind.autoTransaction.base.constans.BaseErrorConstants;
import com.birdwind.autoTransaction.base.security.model.Authority;
import com.birdwind.autoTransaction.base.security.model.SystemUser;
import com.birdwind.autoTransaction.base.system.converter.SystemResourcePacker;
import com.birdwind.autoTransaction.base.utils.LocaleI18nUtils;
import com.birdwind.autoTransaction.constans.MemberErrorConstantsEnums;
import com.birdwind.autoTransaction.entity.model.Member;
import com.birdwind.autoTransaction.entity.model.Role;
import com.birdwind.autoTransaction.entity.service.MemberService;
import com.birdwind.autoTransaction.entity.service.RoleService;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.Collection;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service(value = "customUserDetailsServiceImpl")
public class CustomUserDetailsServiceImpl implements UserDetailsService {

    @Autowired
    private MemberService memberService;

    @Autowired
    private RoleService roleService;

    @Autowired
    private SystemResourcePacker systemResourcePacker;

    @Transactional(readOnly = true)
    public UserDetails loadUserByUsername(String username) {
        if (StringUtils.isBlank(username)) {
            throw new BadCredentialsException(
                LocaleI18nUtils.getString(LocaleI18nUtils.getString(BaseErrorConstants.NULL)));
        }

        Member member = memberService.getMemberByUsername(username).orElseThrow(() -> new BadCredentialsException(
            LocaleI18nUtils.getString(MemberErrorConstantsEnums.MEMBER_LOGIN_NOT_FOUND.valueOfName())));
        BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder();
        System.out.println(bCryptPasswordEncoder.encode(member.getPassword()));

        if (!member.getStatus())
            throw new BadCredentialsException(
                LocaleI18nUtils.getString(MemberErrorConstantsEnums.MEMBER_SUSPENDED.valueOfName()));

        // ?????????????????????????????????
        List<Role> roles = roleService.getRolesByMemberId(member.getMemberId());
        // ?????????????????? role ?????? Spring Security Role
        Set<SimpleGrantedAuthority> authorities =
            roles.stream().map(Role::getRoleKey).map(Authority::getInstance).collect(Collectors.toSet());

        return getUserDetails(member.getUsername(), member.getPassword(), authorities);
    }

    private SystemUser getUserDetails(String account, String password,
        Collection<? extends GrantedAuthority> authorities) {
        return new SystemUser(account, password, true, true, true, true, authorities);
        // return new UserDetails();
    }

}
