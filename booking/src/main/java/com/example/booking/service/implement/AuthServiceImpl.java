package com.example.booking.service.implement;

import com.example.booking.entity.User;
import com.example.booking.repository.UserRepository;
import com.example.booking.service.AuthService;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

@Service
@Slf4j
public class AuthServiceImpl implements AuthService {
    private UserRepository userRepository;

    public AuthServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public User login(String email, String password) {
//        log.debug(email,password);
        log.info(email,password);
        return null;
    }
}
