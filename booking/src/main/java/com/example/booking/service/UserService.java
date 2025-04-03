package com.example.booking.service;

import com.example.booking.entity.User;

public interface UserService {
    User getUserById(String id);
    User getUserByEmail(String id);
    User getUserInfor();
}
