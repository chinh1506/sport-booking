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
}
