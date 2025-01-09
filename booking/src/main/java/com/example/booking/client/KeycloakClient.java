package com.example.booking.client;

import com.example.booking.dto.auth.ExchangeTokenResponse;
import com.example.booking.dto.auth.RegisterUserDTO;
import feign.QueryMap;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.Map;

@FeignClient(name = "keycloak-service", url = "http://localhost:8000")
public interface KeycloakClient {
    @PostMapping(value = "/realms/myspringapp/protocol/openid-connect/token"
            , consumes = MediaType.APPLICATION_FORM_URLENCODED_VALUE)
    ExchangeTokenResponse exchangeToken(@QueryMap Map<?, ?> queryMap);

    @PostMapping(value = "/admin/realms/myspringapp/users")
    ResponseEntity<Object> registerUser(@RequestBody RegisterUserDTO registerUserDTO);
}


