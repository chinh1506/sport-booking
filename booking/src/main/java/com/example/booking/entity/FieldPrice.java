package com.example.booking.entity;


import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalTime;

@Entity
@Table(name = "field_prices")
@Data
public class FieldPrice extends SuperEntity {
    @Column(name = "start_time")
    private LocalTime startTime;
    @Column(name = "end_time")
    private LocalTime endTime;
    @Column
    private double price;
    @Column
    private String description;

    @ManyToOne
    @JoinColumn(name = "sport_field_id")
    @JsonManagedReference(value = "sport_field_price")
    private SportField sportField;
}
