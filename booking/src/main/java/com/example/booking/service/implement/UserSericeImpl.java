package com.example.booking.service.implement;

import com.example.booking.client.KeycloakClient;
import com.example.booking.entity.User;
import com.example.booking.repository.UserRepository;
import com.example.booking.service.UserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

@Slf4j
@Service
public class UserSericeImpl implements UserService {
    private final KeycloakClient keycloakClient;
    private final UserRepository userRepository;


    public UserSericeImpl(KeycloakClient keycloakClient, UserRepository userRepository) {
        this.keycloakClient = keycloakClient;
        this.userRepository = userRepository;
    }


    @Override
    public User getUserById(String id) {
        SecurityContext securityContext = SecurityContextHolder.getContext();
        Authentication authentication = securityContext.getAuthentication();
        log.info("Authentication: {}", authentication.getPrincipal());
        return null;
    }

    @Override
    public User getUserByEmail(String id) {
        return this.userRepository.findById(id).get();
    }
}
