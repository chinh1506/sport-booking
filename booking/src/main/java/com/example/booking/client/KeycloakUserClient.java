package com.example.booking.client;

import com.example.booking.config.auth.SecurityUtils;
import com.example.booking.dto.client.UserResponseClient;
import feign.RequestInterceptor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;

import java.util.Optional;

@FeignClient(name = "keycloak-user-service", url = "http://localhost:8000", configuration = KeycloakUserClientConfg.class)
public interface KeycloakUserClient {
    @GetMapping("realms/myspringapp/protocol/openid-connect/userinfo")
    ResponseEntity<UserResponseClient> getUserInofor();
}



@Slf4j
class KeycloakUserClientConfg {
    @Bean
    public RequestInterceptor userFeignRequestInterceptor() {
        return requestTemplate -> {
            Optional<String> token = SecurityUtils.getCurrentUserJWT();

            if (!token.isEmpty()) {
                log.info("token: {}", token.get());
                requestTemplate.header("Authorization", "Bearer " + token.get());
            }
        };
    }
}
