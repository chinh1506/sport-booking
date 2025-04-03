package com.example.booking.dto.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
public class RefreshTokenResponse {
    private String accessToken;
    private Long expiresIn;
    private String refreshToken;
    private Long refreshExpiresIn;
    private String scope;
    private String idToken;
    private String tokenType;
    private int notBeforePolicy;
    private String sessionState;
}
