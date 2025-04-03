package com.example.booking.controller;

import com.example.booking.dto.response.UserResponse;
import com.example.booking.entity.User;
import com.example.booking.service.UserService;
import org.modelmapper.ModelMapper;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("users")
public class UserController {

    private final UserService userService;
    private final ModelMapper modelMapper;

    public UserController(UserService userService, ModelMapper modelMapper) {
        this.userService = userService;
        this.modelMapper = modelMapper;
    }

    @GetMapping("my-information")
    public UserResponse getUserService() {
        User user=this.userService.getUserInfor();
        return this.modelMapper.map(user, UserResponse.class);
    }
}
