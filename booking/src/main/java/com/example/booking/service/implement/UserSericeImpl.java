package com.example.booking.service.implement;

import com.example.booking.client.KeycloakClient;
import com.example.booking.entity.User;
import com.example.booking.repository.UserRepository;
import com.example.booking.service.UserService;
import org.springframework.stereotype.Service;

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
        return (User) this.keycloakClient.getUserById(id);
    }

    @Override
    public User getUserByEmail(String id) {
        return this.userRepository.findById(id).get();
    }
}
