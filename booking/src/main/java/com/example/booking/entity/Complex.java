package com.example.booking.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalTime;
import java.util.List;

/*

 */
@EqualsAndHashCode(callSuper = true)
@Entity
@Table(name = "complexes")
@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString(exclude = {"courts"})
public class Complex extends SuperEntity {
    private String name;
    private String description;
    @Column(name = "open_time")
    private LocalTime openTime;
    @Column(name = "close_time")
    private LocalTime closeTime;

    @ManyToOne
    @JoinColumn(name = "owner_id")
    @JsonManagedReference("complex_owner")
    private User owner;

    @OneToMany(mappedBy = "complex")
    @JsonBackReference()
    private List<Court> courts;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "address_id", referencedColumnName = "id")
    @JsonManagedReference(value = "complex_address")
    private Address address;
}
