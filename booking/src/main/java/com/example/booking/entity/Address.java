package com.example.booking.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.util.Date;

@Entity
@Table(name = "addresses")
@Data
public class Address {
    @Id
    private String id;

    private String street;
    private String ward;
    private String district;
    private String city;
    private String country;
    private String zip;
    @Column
    private Double latitude;
    @Column
    private Double longitude;

    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private Date createdAt;
    @UpdateTimestamp
    @Column(name = "updated_at")
    private Date updatedAt;
    @OneToOne(fetch = FetchType.EAGER, mappedBy = "address")
    @JsonBackReference(value = "complex_address")
    private Complex complex;
}
