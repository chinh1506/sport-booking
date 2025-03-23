package com.example.booking.config;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Configurable;
import org.springframework.beans.factory.config.ConfigurableBeanFactory;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Scope;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.transaction.annotation.EnableTransactionManagement;

import java.security.PublicKey;

@Configuration
//@EnableJpaAuditing
//@EnableJpaRepositories
//@EnableTransactionManagement
public class ApplicationContext {


//    @Bean
//    @Scope(ConfigurableBeanFactory.SCOPE_PROTOTYPE)
//    public String generateId(Class<?> clazz) {
//        String query = "SELECT MAX(substring(id, 2)) as max_value FROM "+clazz.getSimpleName();
//        String maxId = this.jdbcTemplate.queryForObject(query, String.class);
//        String prefix = clazz.getSimpleName().substring(0,1);
//        long idVal = 0;
//        if (maxId != null) {
//            idVal = Long.parseLong(maxId);
//        }
//        return prefix + String.format("%03d", idVal + 1);
//    }

    @Bean
    public ObjectMapper objectMapper() {
        return new ObjectMapper();
    }


}
