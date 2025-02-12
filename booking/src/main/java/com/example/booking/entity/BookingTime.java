package com.example.booking.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.Data;

import java.time.LocalTime;

@Entity
@Table(name = "booking_times")
@Data
public class BookingTime extends SuperEntity {

    @Column(name = "start_time", nullable = false, unique = true)
    private LocalTime startTime;
    @Column(name = "end_time", nullable = false, unique = true)
    private LocalTime endTime;

}
