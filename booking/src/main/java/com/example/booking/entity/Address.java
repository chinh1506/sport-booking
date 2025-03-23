package com.example.booking.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;

@EqualsAndHashCode(callSuper = true)
@Entity
@Table(name = "addresses")
@Data
public class Address extends SuperEntity{
    private String street;
    private String ward;
    private String district;
    private String city;
    private String country;
    private String zip;

    @OneToOne(fetch = FetchType.EAGER, mappedBy = "address")
    private SportComplex sportComplex;
}
