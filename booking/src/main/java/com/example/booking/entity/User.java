package com.example.booking.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.io.Serializable;
import java.util.Date;
import java.util.List;
import java.util.Set;

@EqualsAndHashCode(of = "id")
@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
@ToString(exclude = {"userRoles","bookings","complexes"})
@Entity
@Table(name = "users")
public class User implements Serializable {
    @Id
    private String id;
    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private Date createdAt;
    @UpdateTimestamp
    @Column(name = "updated_at")
    private Date updatedAt;
    @Column(name = "first_name")
    private String firstName;
    @Column(name = "last_name")
    private String lastName;
    private String username;
    private String email;
    private String phone;
    private String password;
    @Column(name = "email_verified", nullable = true)
    private boolean emailVerified;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    @JsonIgnore
    @JsonBackReference(value = "user_role")
    private List<UserRole> userRoles;

    @OneToMany(mappedBy = "owner", cascade = CascadeType.ALL)
    @JsonBackReference(value = "complex_owner")
    private List<Complex> complexes;

    @OneToMany(mappedBy = "customer")
    @JsonBackReference("booking_customer")
    @JsonIgnore
    private List<Booking> bookings;



}
