package com.example.booking.service.implement;

import com.example.booking.client.KeycloakUserClient;
import com.example.booking.dto.client.UserResponseClient;
import com.example.booking.entity.User;
import com.example.booking.repository.UserRepository;
import com.example.booking.service.UserService;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

@Slf4j
@Service
public class UserSericeImpl implements UserService {
    private final KeycloakUserClient keycloakUserClient;
    private final UserRepository userRepository;
    private final ModelMapper modelMapper;


    public UserSericeImpl(KeycloakUserClient keycloakUserClient, UserRepository userRepository, ModelMapper modelMapper) {
        this.keycloakUserClient = keycloakUserClient;
        this.userRepository = userRepository;
        this.modelMapper = modelMapper;
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

    @Override
    public User getUserInfor() {
        UserResponseClient userInfor = this.keycloakUserClient.getUserInofor().getBody();
        User userDb = this.userRepository.findById(userInfor.getId()).orElse(null);
        if (userDb == null) {
            this.userRepository.save(User.builder()
                    .email(userInfor.getEmail())
                    .id(userInfor.getId())
                    .username(userInfor.getUsername())
                    .firstName(userInfor.getFirstName())
                    .lastName(userInfor.getLastName())
                    .emailVerified(userInfor.isEmailVerified())
                    .build());
            return this.modelMapper.map(userInfor, User.class);
        }
        log.info(userDb.toString());
        return userDb;
    }
}
