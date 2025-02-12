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
@Table(name = "sport_complexes")
@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString(exclude = {"sportFields"})
public class SportComplex extends SuperEntity{
    private String name;
    private String description;
    private String address;
    @Column(name = "open_time")
    private LocalTime openTime;
    @Column(name = "close_time")
    private LocalTime closeTime;

    @ManyToOne
    @JoinColumn(name = "owner_id")
    @JsonManagedReference("sportComplex_owner")
    private User owner;

    @OneToMany(mappedBy = "sportComplex")
    @JsonBackReference()
    private List<SportField> sportFields;
}
