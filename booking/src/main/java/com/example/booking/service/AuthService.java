package com.example.booking.service;

import com.example.booking.entity.User;

public interface AuthService {

    User login(String email,String password);

}
