package com.example.booking.config;

import com.example.booking.dto.response.ComplexResponse;
import com.example.booking.dto.response.CourtResponse;
import com.example.booking.entity.Complex;
import com.example.booking.entity.Court;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
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
@EnableJpaAuditing
@EnableJpaRepositories(basePackages = {"com.example.booking.repository"})
@EnableTransactionManagement
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
        ObjectMapper objectMapper = new ObjectMapper();
        objectMapper.registerModule(new JavaTimeModule());
        objectMapper.disable(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS);
        return objectMapper;
    }

    @Bean
    public ModelMapper modelMapper() {
        ModelMapper modelMapper = new ModelMapper();
        modelMapper.getConfiguration()
                .setMatchingStrategy(MatchingStrategies.STRICT);

        modelMapper.typeMap(Complex.class, ComplexResponse.class).addMappings(mapper -> {
            mapper.map(Complex::getAddress, ComplexResponse::setAddress);
            mapper.map(Complex::getOwner, ComplexResponse::setOwner);
        });

        modelMapper.typeMap(Court.class, CourtResponse.class);
//                .addMappings(mapper -> {
//            mapper.map(Court::getComplex, CourtResponse::setComplex);
//        });
        return modelMapper;
    }


}
