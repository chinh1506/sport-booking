package com.example.booking.entity;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Entity
@Table(name = "user_roles")
@IdClass(UserRolePK.class)
@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserRole implements Serializable {
    @Id
    @ManyToOne
    @JoinColumn(name = "user_id")
    @JsonManagedReference
    private User user;

    @Id
    @ManyToOne
    @JoinColumn(name = "role_id")
    @JsonManagedReference
    private Role role;


}
