package com.birdwind.springBootInit.base.config;

import java.util.Locale;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.MessageSource;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.i18n.LocaleContextHolder;
import org.springframework.context.support.ResourceBundleMessageSource;
import org.springframework.web.servlet.LocaleResolver;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.web.servlet.i18n.SessionLocaleResolver;

import com.birdwind.springBootInit.base.interceptor.FunctionOperatorInterceptor;
import com.birdwind.springBootInit.base.interceptor.LoginInterceptor;
import com.birdwind.springBootInit.base.interceptor.SideMenuInterceptor;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Autowired
    private LoginInterceptor loginInterceptor;

    @Autowired
    private FunctionOperatorInterceptor functionOperatorInterceptor;

    @Autowired
    private SideMenuInterceptor sideMenuInterceptor;

    @Bean(name = "sitemesh3")
    SiteMeshFilter siteMeshFilter() {
        return new SiteMeshFilter();
    }

    @Bean
    public FilterRegistrationBean<SiteMeshFilter> filterRegistrationBean(
            @Qualifier("sitemesh3") SiteMeshFilter siteMeshFilter) {
        FilterRegistrationBean<SiteMeshFilter> filterRegistrationBean = new FilterRegistrationBean<>();
        filterRegistrationBean.setFilter(siteMeshFilter);
        filterRegistrationBean.setEnabled(true);
        filterRegistrationBean.addUrlPatterns("/*");
        return filterRegistrationBean;
    }

    @Override
    public void addInterceptors(InterceptorRegistry registry) {

        registry.addInterceptor(loginInterceptor).addPathPatterns("/**").excludePathPatterns("/file/**", "/guest/**",
                "/api/**/guest/**", "/error/**", "/errors/**", "/images/**", "/wayson/styles/**", "/wayson/scripts/**",
                "/styles/**", "/scripts/**", "/plugin/**", "/login/**", "/logout/**", "/logoutSuccessfully/**", "/api/notification/**",
                "/page/notification/**");
        registry.addInterceptor(functionOperatorInterceptor).addPathPatterns("/**").excludePathPatterns("/file/**",
                "/guest/**", "/api/**/guest/**", "/", "/profile/**", "/error/**", "/errors/**", "/images/**",
                "/wayson/styles/**", "/wayson/scripts/**", "/styles/**", "/scripts/**", "/plugin/**", "/login/**", "/logout/**",
                "/logoutSuccessfully/**", "/api/notification/**", "/page/notification/**");

        // 回傳的ModelAndView放入sideMenu變數，讓前端可以取得現在有效登入的使用者sideMenu
        registry.addInterceptor(sideMenuInterceptor).addPathPatterns("/**").excludePathPatterns("/file/**", "/guest/**",
                "/api/**", "/error/**", "/errors/**", "/images/**", "/wayson/styles/**", "/wayson/scripts/**", "/styles/**",
                "/scripts/**", "/plugin/**", "/login/**", "/logout/**", "/logoutSuccessfully/**", "/page/notification/**");
    }

    @Bean
    public MessageSource messageSource() {
        ResourceBundleMessageSource messageSource = new ResourceBundleMessageSource();
        messageSource.setBasename("messages");
        messageSource.setDefaultEncoding("UTF-8");
        return messageSource;
    }

    @Bean
    public LocaleResolver localeResolver() {
        SessionLocaleResolver localeResolver = new SessionLocaleResolver();
        localeResolver.setDefaultLocale(Locale.TRADITIONAL_CHINESE);
        LocaleContextHolder.setDefaultLocale(Locale.TRADITIONAL_CHINESE);
        return localeResolver;
    }

//    @Bean
//    public Docket apiDoc() {
//        return new Docket(DocumentationType.SWAGGER_2).apiInfo(apiInfo()).select()
//            .apis(RequestHandlerSelectors.basePackage("com.orange.orange_vote.controller")).paths(PathSelectors.any())
//            .build();
//    }
//
//    private ApiInfo apiInfo() {
//        return new ApiInfoBuilder().title("OrangeVote API文檔").version(BaseErrorConstants.API_VERSION).build();
//    }
}
