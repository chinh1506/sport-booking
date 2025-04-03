package com.example.booking.entity;


import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalTime;

@Entity
@Table(name = "court_prices")
@Data
public class CourtPrice extends SuperEntity {
    @Column(name = "start_time")
    private LocalTime startTime;
    @Column(name = "end_time")
    private LocalTime endTime;
    @Column
    private double price;
    @Column
    private String description;

    @ManyToOne
    @JoinColumn(name = "court_id")
    @JsonManagedReference(value = "court_price")
    private Court court;
}
