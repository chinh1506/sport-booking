package com.example.booking.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Table(name = "sport_fields")
@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class SportField extends SuperEntity {
    private String name;

    private String description;
    private FieldType type;
    @ManyToOne
    @JoinColumn(name = "sport_complex_id")
    private SportComplex sportComplex;


}
