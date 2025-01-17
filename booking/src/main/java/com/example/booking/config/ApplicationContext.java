package com.example.booking.config;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Configurable;
import org.springframework.context.annotation.Bean;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@Configurable
@EnableJpaAuditing
public class ApplicationContext {
    @Bean
    public ObjectMapper objectMapper() {
        return new ObjectMapper();
    }
}
