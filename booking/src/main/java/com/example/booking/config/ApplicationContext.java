package com.example.booking.config;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Configurable;
import org.springframework.context.annotation.Bean;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.transaction.annotation.EnableTransactionManagement;

@Configurable
@EnableJpaAuditing
@EnableJpaRepositories
@EnableTransactionManagement
public class ApplicationContext {
    @Bean
    public ObjectMapper objectMapper() {
        return new ObjectMapper();
    }
}
