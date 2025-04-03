package com.example.booking.dto.request;

import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
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
//@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
public class TokenParamRequest {
    private String grantType;
    private String clientId;
    private String clientSecret;
    private String scope;
    private String refreshToken;


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
