package com.birdwind.autoTransaction;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.data.repository.config.BootstrapMode;

@ComponentScan(lazyInit = true, value = {"com.birdwind.autoTransaction.*"})
@EnableJpaRepositories(bootstrapMode = BootstrapMode.LAZY, value = {"com.birdwind.autoTransaction.entity.dao"})
@EntityScan({"com.birdwind.springBootInit.*"})
@SpringBootApplication
public class SpringBootInitApplication extends SpringBootServletInitializer {

	@Override
	protected SpringApplicationBuilder configure(SpringApplicationBuilder builder) {
		return builder.sources(SpringBootInitApplication.class);
	}

	public static void main(String[] args) {
		SpringApplication.run(SpringBootInitApplication.class, args);
	}

}
