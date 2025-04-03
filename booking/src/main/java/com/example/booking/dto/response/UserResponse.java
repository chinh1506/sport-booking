package com.example.booking.dto.response;

import lombok.Data;

import java.util.List;

@Data
public class UserResponse {
    private String id;
    private String firstName;
    private String lastName;
    private String username;
    private String email;
    private String phone;
    private List<String> roles; 
}
