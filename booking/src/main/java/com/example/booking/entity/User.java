package com.example.booking.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.io.Serializable;
import java.util.List;
import java.util.Set;

@EqualsAndHashCode(callSuper = true)
@NoArgsConstructor
@AllArgsConstructor
@Data
@ToString(exclude = {"userRoles","bookings","sportComplexes"})
@Entity
@Table(name = "users")
public class User extends SuperEntity implements Serializable {
    @Column(name = "first_name")
    private String firstName;
    @Column(name = "last_name")
    private String lastName;
    private String username;
    private String email;
    private String phone;
    private String password;



    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    @JsonIgnore
    @JsonBackReference(value = "user_role")
    private List<UserRole> userRoles;

    @OneToMany(mappedBy = "owner", cascade = CascadeType.ALL)
    @JsonBackReference("sportComplex_owner")
    @JsonIgnore
    private Set<SportComplex> sportComplexes;

    @OneToMany(mappedBy = "customer")
    @JsonBackReference("booking_customer")
    @JsonIgnore
    private List<Booking> bookings;



}
