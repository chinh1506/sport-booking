package com.example.booking.controller;

import com.example.booking.dto.auth.RegisterUserRequest;
import com.example.booking.dto.auth.TokenParamRequest;
import com.example.booking.service.AuthService;
import com.example.booking.util.RestResponse;
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
    @PostMapping(value = "/refresh-token")
    public ResponseEntity<RestResponse<?>> refreshToken(@Valid @RequestBody TokenParamRequest tokenParamDto) throws IllegalAccessException {
        Object token = authService.refreshToken(tokenParamDto.getRefreshToken());
        System.out.println(token);
        return ResponseEntity.ok(RestResponse.builder().data(token).build());
    }
}
