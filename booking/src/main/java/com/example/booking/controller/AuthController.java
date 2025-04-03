package com.example.booking.controller;

import com.example.booking.dto.client.ExchangeTokenClient;
import com.example.booking.dto.request.RegisterUserRequest;
import com.example.booking.dto.request.TokenParamRequest;
import com.example.booking.dto.response.RefreshTokenResponse;
import com.example.booking.service.AuthService;
import com.example.booking.util.RestResponse;
import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequestMapping("auth")
public class AuthController {
    private final AuthService authService;
    private final ModelMapper modelMapper;

    public AuthController(AuthService authService, ModelMapper modelMapper) {
        this.authService = authService;
        this.modelMapper = modelMapper;
    }


    @PostMapping(value = "/register")
    public ResponseEntity<RestResponse<?>> register(@Valid @RequestBody RegisterUserRequest registerUserDTO) throws IllegalAccessException {
        Object registerUser = authService.register(registerUserDTO);
        System.out.println(registerUser);
        return ResponseEntity.ok(RestResponse.builder().data(registerUser).build());
    }

    @PostMapping(value = "/refresh-token")
    public ResponseEntity<RestResponse<?>> refreshToken(@Valid @RequestBody TokenParamRequest tokenParamDto) {
//        log.info("Refresh token: {}", tokenParamDto);

        ExchangeTokenClient token = authService.refreshToken(tokenParamDto.getRefreshToken(), tokenParamDto.getClientId());
        return ResponseEntity.ok(RestResponse.success(modelMapper.map(token, RefreshTokenResponse.class)));
    }
}
