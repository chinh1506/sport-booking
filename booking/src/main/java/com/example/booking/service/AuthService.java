package com.example.booking.service;

import com.example.booking.dto.auth.ExchangeTokenResponse;
import com.example.booking.dto.auth.RegisterUserRequest;
import com.example.booking.dto.auth.TokenParamRequest;
import com.example.booking.entity.User;

public interface AuthService {

    Object register(RegisterUserRequest registerUserRequest) throws IllegalAccessException;
//    ExchangeTokenResponse exchangeToken(TokenParamRequest tokenParamRequest);
}
