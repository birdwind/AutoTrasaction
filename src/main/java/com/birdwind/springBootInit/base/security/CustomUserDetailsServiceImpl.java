package com.birdwind.springBootInit.base.security;

import com.birdwind.springBootInit.base.constans.BaseErrorConstants;
import com.birdwind.springBootInit.base.security.model.Authority;
import com.birdwind.springBootInit.base.security.model.SystemUser;
import com.birdwind.springBootInit.base.system.converter.SystemResourcePacker;
import com.birdwind.springBootInit.base.utils.LocaleI18nUtils;
import com.birdwind.springBootInit.constans.MemberErrorConstantsEnums;
import com.birdwind.springBootInit.entity.model.Member;
import com.birdwind.springBootInit.entity.model.Role;
import com.birdwind.springBootInit.entity.service.MemberService;
import com.birdwind.springBootInit.entity.service.RoleService;
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

        // 取得帳號擁有的所有角色
        List<Role> roles = roleService.getRolesByMemberId(member.getMemberId());
        // 根據帳號有的 role 賦予 Spring Security Role
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
