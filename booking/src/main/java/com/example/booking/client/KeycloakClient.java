package com.example.booking.client;

import com.example.booking.dto.auth.ExchangeTokenResponse;
import com.example.booking.dto.auth.RegisterUserParam;
import com.example.booking.dto.auth.RegisterUserRequest;
import feign.QueryMap;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@FeignClient(name = "keycloak-service", url = "http://localhost:8000")
public interface KeycloakClient {

    @PostMapping(value = "/realms/myspringapp/protocol/openid-connect/token"
            , consumes = MediaType.APPLICATION_FORM_URLENCODED_VALUE)
    ExchangeTokenResponse exchangeToken(@QueryMap Map<?, ?> queryMap);

    @PostMapping(value = "/admin/realms/myspringapp/users", consumes = MediaType.APPLICATION_JSON_VALUE)
    ResponseEntity<Object> registerUser(@RequestBody RegisterUserParam registerUserParam);

    @PutMapping("/admin/realms/myspringapp/users/{userId}/send-verify-email")
    ResponseEntity<Object>  sendVerifyEmail(@PathVariable String userId);

    ///admin/realms/{realm}/users/{user-id}
    @DeleteMapping("admin/realms/myspringapp/users/{userId}")
    ResponseEntity<Object>  deleteUserById(@PathVariable String userId);

    //GET /admin/realms/{realm}/users/{user-id}
    @GetMapping("/admin/realms/myspringapp/users/{userId}")
    Object  getUserById(@PathVariable String userId);

}


