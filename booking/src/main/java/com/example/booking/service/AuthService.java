package com.example.booking.service;

import com.example.booking.dto.client.ExchangeTokenClient;
import com.example.booking.dto.request.RegisterUserRequest;

public interface AuthService {

    Object register(RegisterUserRequest registerUserRequest) throws IllegalAccessException;
    ExchangeTokenClient refreshToken(String refreshToken,String clientId) ;
//    ExchangeTokenClient exchangeToken(TokenParamRequest tokenParamRequest);
}
