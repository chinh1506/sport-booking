package com.example.booking.config;

import com.example.booking.dto.response.BookingResponse;
import com.example.booking.dto.response.ComplexResponse;
import com.example.booking.dto.response.CourtResponse;
import com.example.booking.entity.Booking;
import com.example.booking.entity.Complex;
import com.example.booking.entity.Court;
import com.fasterxml.jackson.databind.DeserializationFeature;
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
import org.springframework.data.redis.connection.RedisConnectionFactory;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.transaction.annotation.EnableTransactionManagement;

import java.security.PublicKey;

@Configuration
@EnableJpaAuditing
@EnableJpaRepositories(basePackages = {"com.example.booking.repository"})
@EnableTransactionManagement
public class ApplicationContext {
    @Bean
    public RedisTemplate<String, String> redisTemplate(RedisConnectionFactory connectionFactory) {
        RedisTemplate<String, String> template = new RedisTemplate<>();
        template.setConnectionFactory(connectionFactory);
        // Add some specific configuration here. Key serializers, etc.
        return template;
    }

    @Bean
    public ObjectMapper objectMapper() {
        ObjectMapper objectMapper = new ObjectMapper();
        objectMapper.registerModule(new JavaTimeModule());
        objectMapper.disable(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS);
        objectMapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
        return objectMapper;
    }

    @Bean
    public ModelMapper modelMapper() {
        ModelMapper modelMapper = new ModelMapper();
        modelMapper.getConfiguration()
                .setMatchingStrategy(MatchingStrategies.STRICT);

        modelMapper.typeMap(Complex.class, ComplexResponse.class).addMappings(mapper -> {
//            mapper.map(Complex::getAddress, ComplexResponse::setAddress);
//            mapper.map(Complex::getOwner, ComplexResponse::setOwner);
        });

        modelMapper.typeMap(Court.class, CourtResponse.class);
        modelMapper.typeMap(Booking.class, BookingResponse.class);

        return modelMapper;
    }


}
