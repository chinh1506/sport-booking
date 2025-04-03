package com.example.booking.dto.client;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.PropertyNamingStrategy;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@JsonNaming(PropertyNamingStrategy.SnakeCaseStrategy.class)
@JsonIgnoreProperties(ignoreUnknown = true)
public class ExchangeTokenClient {
//    @JsonProperty("access_token")
    private String accessToken;
//    @JsonProperty("expires_in")
    private Long expiresIn;
//    @JsonProperty("refresh_token")
    private String refreshToken;
//    @JsonProperty("refresh_expires_in")
    private Long refreshExpiresIn;
    private String scope;
//    @JsonProperty("id_token")
    private String idToken;
//    @JsonProperty("token_type")
    private String tokenType;
    @JsonProperty("not-before-policy")
    private int notBeforePolicy;
//    @JsonProperty("session_state")
    private String sessionState;

}
