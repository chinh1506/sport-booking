package com.example.booking.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@EqualsAndHashCode(callSuper = true)
@Table(name = "sport_fields")
@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class SportField extends SuperEntity {
    private String name;

    private String description;
    @Enumerated(EnumType.STRING)
    private FieldType type;
    @ManyToOne
    @JoinColumn(name = "sport_complex_id")
    @JsonBackReference
    private SportComplex sportComplex;


}
