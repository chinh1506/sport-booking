package com.example.booking.controller;

import com.example.booking.client.KeycloakClient;
import com.example.booking.dto.auth.ExchangeTokenResponse;
import com.example.booking.dto.auth.RegisterUserRequest;
import com.example.booking.dto.auth.TokenParamRequest;
import com.example.booking.dto.auth.UserLoginDTO;
import com.example.booking.service.AuthService;
import com.example.booking.util.RestResponse;
import jakarta.annotation.security.PermitAll;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("auth")
public class AuthController {
    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }


    @PostMapping(value = "/register")
    public ResponseEntity<RestResponse<?>> register(@Valid @RequestBody RegisterUserRequest registerUserDTO) throws IllegalAccessException {
        Object registerUser = authService.register(registerUserDTO);
        System.out.println(registerUser);
        return ResponseEntity.ok(RestResponse.builder().data(registerUser).build());
    }
}
