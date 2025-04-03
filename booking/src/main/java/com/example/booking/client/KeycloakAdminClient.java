package com.example.booking.client;

import com.example.booking.dto.client.ExchangeTokenClient;
import com.example.booking.dto.client.RegisterUserParam;
import feign.QueryMap;
import feign.RequestInterceptor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.cloud.openfeign.security.OAuth2AccessTokenInterceptor;
import org.springframework.context.annotation.Bean;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.oauth2.client.OAuth2AuthorizedClientManager;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@FeignClient(name = "keycloak-admin-service", url = "http://localhost:8000", configuration = KeycloakAdminClientConfiguration.class)
public interface KeycloakAdminClient {

    @PostMapping(value = "/realms/myspringapp/protocol/openid-connect/token"
            , consumes = MediaType.APPLICATION_FORM_URLENCODED_VALUE)
    ExchangeTokenClient exchangeToken(@QueryMap Map<?, ?> queryMap);

    @PostMapping(value = "/admin/realms/myspringapp/users", consumes = MediaType.APPLICATION_JSON_VALUE)
    ResponseEntity<Object> registerUser(@RequestBody RegisterUserParam registerUserParam);

    @PutMapping("/admin/realms/myspringapp/users/{userId}/send-verify-email")
    ResponseEntity<Object> sendVerifyEmail(@PathVariable String userId);

    @DeleteMapping("admin/realms/myspringapp/users/{userId}")
    ResponseEntity<Object> deleteUserById(@PathVariable String userId);

    @GetMapping("/admin/realms/myspringapp/users/{userId}")
    Object getUserById(@PathVariable String userId);


}

@Slf4j
class KeycloakAdminClientConfiguration {

    private final String CLIENT_REGISTRATION_ID = "account-service";

    @Bean
    RequestInterceptor requestInterceptor(OAuth2AuthorizedClientManager authorizedClientManager) {
        log.info("Keycloak admin client configuration {}", authorizedClientManager);
        return new OAuth2AccessTokenInterceptor(CLIENT_REGISTRATION_ID, authorizedClientManager);
    }
}


