package com.example.booking.util;

import lombok.*;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RestResponse<T> {
    private String status;
    private int statusCode;
    private String error;
    private Object message;
    private T data;

    public static <T> RestResponse<T> success(T data) {
        return new RestResponse<>("success", 200, null, null, data);
    }

    public static RestResponse<?> error(String message) {
        return new RestResponse<>("error", 403, message, message, null);
    }
}
