package com.example.booking.dto.auth;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.lang.reflect.Field;
import java.util.HashMap;
import java.util.Map;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TokenParamRequest {
    @NotBlank(message = "grant_type can't be blank")
    private String grantType;
    @NotBlank(message = "client_id can't be blank")
    private String clientId;
    @NotBlank(message = "client_secret can't be blank")
    private String clientSecret;
    private String scope;


    public static Map<String, String> getMap(TokenParamRequest tokenRequestParam) throws IllegalAccessException {
        Field[] fs = tokenRequestParam.getClass().getDeclaredFields();
        Map<String, String> map = new HashMap<>();
        for (Field f : fs) {
            String snakeCaseKey = f.getName().replaceAll("([a-z])([A-Z])", "$1_$2").toLowerCase();
            String value = (String) f.get(tokenRequestParam);
            if (value != null) {
                map.put(snakeCaseKey, value);
            }
        }
        return map;
    }
}
