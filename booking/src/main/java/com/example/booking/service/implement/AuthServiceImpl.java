package com.example.booking.service.implement;

import com.example.booking.client.KeycloakClient;
import com.example.booking.dto.auth.ExchangeTokenResponse;
import com.example.booking.dto.auth.RegisterUserParam;
import com.example.booking.dto.auth.RegisterUserRequest;
import com.example.booking.dto.auth.TokenParamRequest;
import com.example.booking.entity.User;
import com.example.booking.repository.UserRepository;
import com.example.booking.service.AuthService;
import com.fasterxml.jackson.databind.ObjectMapper;
import feign.FeignException;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Objects;

@Service
@Slf4j
public class AuthServiceImpl implements AuthService {
    private final KeycloakClient keycloakClient;
    private final ObjectMapper objectMapper;
    private final UserRepository userRepository;


    public AuthServiceImpl(KeycloakClient keycloakClient, ObjectMapper objectMapper, UserRepository userRepository) {
        this.keycloakClient = keycloakClient;
        this.objectMapper = objectMapper;
        this.userRepository = userRepository;
    }

    @Override
    @Transactional
    public User register(RegisterUserRequest registerUserRequest) {
        String userId=null;
        try {
            User user = objectMapper.convertValue(registerUserRequest, User.class);
            log.info("{}", user);
            RegisterUserParam registerUserParam = RegisterUserParam.builder()
                    .email(registerUserRequest.getEmail())
                    .username(registerUserRequest.getEmail())
                    .firstName(registerUserRequest.getFirstName())
                    .lastName(registerUserRequest.getLastName())
                    .enabled(true)
                    .build();
            log.debug("{}", registerUserParam);

            ResponseEntity<Object> registerUserRes = this.keycloakClient.registerUser(registerUserParam);
            userId = extractUserId(registerUserRes);
            user.setId(userId);
            this.keycloakClient.sendVerifyEmail(userId);

            return this.userRepository.save(user);
        } catch (Exception e) {
            log.debug(e.getMessage());
//            if(!(e instanceof FeignException)){
//                this.keycloakClient.deleteUserById(userId);
//            }
            throw new RuntimeException(e);
        }


    }

    private String extractUserId(ResponseEntity<?> response) {
        String location = Objects.requireNonNull(response.getHeaders().get("Location")).getFirst();
        String[] splitedStr = location.split("/");
        return splitedStr[splitedStr.length - 1];
    }

}
