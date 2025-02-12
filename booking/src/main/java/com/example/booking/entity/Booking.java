package com.example.booking.entity;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.SuperBuilder;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

@EqualsAndHashCode(callSuper = true)
@NoArgsConstructor
@AllArgsConstructor
@Data
@SuperBuilder
@ToString(exclude = {"customer","sportField"})
@Entity
@Table(name = "bookings")
public class Booking extends SuperEntity  {
    @Column(name = "start_date")
    private LocalDate startDate;
    @Column(name = "end_date")
    private LocalDate endDate;
    @Column(name = "start_time")
    private LocalTime startTime;
    @Column(name = "end_time")
    private LocalTime endTime;
    @Column(name = "total_price")
    private Double totalPrice;
    @Column
    @Enumerated(EnumType.STRING)
    private BookingStatus status;

    @ManyToOne
    @JoinColumn(name = "sport_field_id")
    @JsonManagedReference
    private SportField sportField;

    @ManyToOne
    @JoinColumn(name = "customer_id")
    @JsonManagedReference("booking_customer")
    private User customer;

}


