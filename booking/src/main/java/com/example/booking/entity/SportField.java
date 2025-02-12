package com.example.booking.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.SuperBuilder;

import java.util.List;

@EqualsAndHashCode(callSuper = true)
@Table(name = "sport_fields")
@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@SuperBuilder
@ToString(exclude = {"fieldPrices"})
public class SportField extends SuperEntity {
    private String name;

    private String description;
    @Enumerated(EnumType.STRING)
    private FieldType type;
    @ManyToOne
    @JoinColumn(name = "sport_complex_id")
    @JsonBackReference
    private SportComplex sportComplex;

    @OneToMany(mappedBy = "sportField")
    @JsonBackReference(value = "sport_field_price")
    private List<FieldPrice> fieldPrices;


}
