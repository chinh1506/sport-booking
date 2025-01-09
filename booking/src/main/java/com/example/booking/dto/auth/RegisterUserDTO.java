package com.example.booking.dto.auth;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
//@Builder
public class RegisterUserDTO {
//    private String id;
//    private String username;
@NotBlank
    private String firstName;
    @NotBlank
    private String lastName;
    @NotBlank
    private String email;

}
