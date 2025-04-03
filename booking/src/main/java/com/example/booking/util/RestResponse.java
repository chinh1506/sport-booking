package com.example.booking.util;

import lombok.*;
import org.springframework.http.HttpStatus;

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

    public static <A> RestResponse<A> success(A data) {
        return new RestResponse<>("success", 200, null, "success", data);
    }

    public static RestResponse<?> error(String message) {
        return new RestResponse<>("error", HttpStatus.FORBIDDEN.value(), message, message, null);
    }
}
