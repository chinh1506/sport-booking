package com.example.booking.service.implement;

import com.example.booking.client.KeycloakAdminClient;
import com.example.booking.dto.client.ExchangeTokenClient;
import com.example.booking.dto.client.RegisterUserParam;
import com.example.booking.dto.request.RegisterUserRequest;
import com.example.booking.entity.User;
import com.example.booking.repository.UserRepository;
import com.example.booking.service.AuthService;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.Map;
import java.util.Objects;

@Service
@Slf4j
public class AuthServiceImpl implements AuthService {
    private final KeycloakAdminClient keycloakClient;
    private final UserRepository userRepository;
    private final ObjectMapper objectMapper;

    @Value("${account-service.client-id}")
    private String accountServiceClientId;


    public AuthServiceImpl(KeycloakAdminClient keycloakClient, UserRepository userRepository, ObjectMapper objectMapper) {
        this.keycloakClient = keycloakClient;
        this.objectMapper = objectMapper;
        this.userRepository = userRepository;
    }

    @Override
    @Transactional
    public User register(RegisterUserRequest registerUserRequest) {
        String userId = null;
        try {
            User user = objectMapper.convertValue(registerUserRequest, User.class);
//            log.info("{}", user);
            RegisterUserParam registerUserParam = RegisterUserParam.builder()
                    .email(registerUserRequest.getEmail())
                    .username(registerUserRequest.getEmail())
                    .firstName(registerUserRequest.getFirstName())
                    .lastName(registerUserRequest.getLastName())
                    .enabled(true)
                    .build();
//            log.debug("{}", registerUserParam);

            ResponseEntity<Object> registerUserRes = this.keycloakClient.registerUser(registerUserParam);
            userId = extractUserId(registerUserRes);
            user.setId(userId);
            this.keycloakClient.sendVerifyEmail(userId);

            return this.userRepository.save(user);
        } catch (Exception e) {
            log.debug(e.getMessage());
            throw new RuntimeException(e);
        }


    }

    @Override
    public ExchangeTokenClient refreshToken(String refreshToken,String clientId) {
        Map<String, String> params = new HashMap<>();

        params.put("refresh_token", refreshToken);
        params.put("grant_type", "refresh_token");
        params.put("client_id", clientId);

        return this.keycloakClient.exchangeToken(params);
    }


    private String extractUserId(ResponseEntity<?> response) {
        String location = Objects.requireNonNull(response.getHeaders().get("Location")).getFirst();
        String[] splitedStr = location.split("/");
        return splitedStr[splitedStr.length - 1];
    }

}
