package com.example.booking.dto.auth;

import jakarta.validation.constraints.AssertTrue;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RegisterUserParam {
    private String id;
    private String firstName;
    private String lastName;
    private String email;
    private String username;
    private boolean emailVerified;
    private boolean enabled;
}
