package com.example.booking.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Entity
@Table(name = "bookings")
public class Booking extends SuperEntity  {
    @Column(name = "start_time")
    private LocalDateTime startTime;
    @Column(name = "end_time")
    private LocalDateTime endTime;
    @Column(name = "total_price")
    private Double totalPrice;
    private BookingStatus status;

    @ManyToOne
    @JoinColumn(name = "sport_field_id")
    private SportField sportField;

}


