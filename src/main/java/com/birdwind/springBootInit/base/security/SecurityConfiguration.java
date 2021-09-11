package com.birdwind.springBootInit.base.security;

import com.google.common.collect.Lists;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.ProviderManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import java.util.List;

@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true, securedEnabled = true)
public class SecurityConfiguration extends WebSecurityConfigurerAdapter {

    private static final String[] AUTHORIZE_REQUESTS = {"/images/**", "/styles/**", "/scripts/**", "/api/**"};

    @Autowired
    @Qualifier(value = "customUserDetailsServiceImpl")
    private UserDetailsService userDetailsService;

    @Autowired
    private CustomAuthenticationEntryPoint customAuthenticationEntryPoint; // 未登陆时返回 JSON 格式的数据给前端（否则为 html）

    @Autowired
    private CustomAuthenticationSuccessHandler customAuthenticationSuccessHandler; // 登录成功返回的 JSON 格式数据给前端（否则为 html）

    @Autowired
    private CustomAuthenticationFailureHandler customAuthenticationFailureHandler; // 登录失败返回的 JSON 格式数据给前端（否则为 html）

    @Autowired
    private CustomLogoutHandler customLogoutHandler; // 注销成功返回的 JSON 格式数据给前端（否则为 登录时的 html）

    @Autowired
    private CustomAccessDeniedHandler customAccessDeniedHandler; // 无权访问返回的 JSON 格式数据给前端（否则为 403 html 页面）

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.csrf().disable().authorizeRequests().antMatchers(AUTHORIZE_REQUESTS).permitAll()
                // .anyRequest().authenticated()
                .and().addFilterAt(customAuthenticationFilter(), UsernamePasswordAuthenticationFilter.class)
                .exceptionHandling().accessDeniedHandler(new CustomAccessDeniedHandler()).and().formLogin()
                .loginPage("/login").and().logout().logoutUrl("/logout").logoutSuccessUrl("/logoutSuccessfully")
                .invalidateHttpSession(true).clearAuthentication(true).permitAll();

//        http.csrf().disable().httpBasic().authenticationEntryPoint(customAuthenticationEntryPoint)
//
//                .and().authorizeRequests().antMatchers(AUTHORIZE_REQUESTS).permitAll()
//
//                .and().addFilterAt(customAuthenticationFilter(), UsernamePasswordAuthenticationFilter.class)
//                .exceptionHandling().accessDeniedHandler(customAccessDeniedHandler)
//
//                .and().formLogin().loginPage("/login").successHandler(customAuthenticationSuccessHandler)
//                .failureHandler(customAuthenticationFailureHandler).permitAll()
//
//                .and().logout().logoutUrl("/logout").logoutSuccessUrl("/logoutSuccessfully").logoutSuccessHandler(customLogoutHandler).invalidateHttpSession(true)
//                .clearAuthentication(true).permitAll();

    }

    @Bean
    public UsernamePasswordAuthenticationFilter customAuthenticationFilter() {
        UsernamePasswordAuthenticationFilter authFilter = new UsernamePasswordAuthenticationFilter();
        List<AuthenticationProvider> authenticationProviderList = Lists.newArrayList(authenticationProvider());
        AuthenticationManager authenticationManager = new ProviderManager(authenticationProviderList);
        authFilter.setAuthenticationManager(authenticationManager);
        authFilter.setAuthenticationSuccessHandler(customAuthenticationSuccessHandler());
        authFilter.setAuthenticationFailureHandler(customAuthenticationFailureHandler());
        return authFilter;
    }

    @Bean
    public DaoAuthenticationProvider authenticationProvider() {
        DaoAuthenticationProvider authenticationProvider = new DaoAuthenticationProvider();
        authenticationProvider.setUserDetailsService(userDetailsService);
        authenticationProvider.setPasswordEncoder(passwordEncoder());
        return authenticationProvider;
    }

    @Bean
    public CustomAuthenticationSuccessHandler customAuthenticationSuccessHandler() {
        return new CustomAuthenticationSuccessHandler();
    }

    @Bean
    public CustomAuthenticationFailureHandler customAuthenticationFailureHandler() {
        return new CustomAuthenticationFailureHandler();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
//         return new PlainTextPasswordEncoder();
    }

    public class PlainTextPasswordEncoder implements PasswordEncoder {

        @Override
        public String encode(CharSequence charSequence) {
            return charSequence.toString();
        }

        @Override
        public boolean matches(CharSequence charSequence, String s) {
            return charSequence.toString().equals(s);
        }

    }

}
