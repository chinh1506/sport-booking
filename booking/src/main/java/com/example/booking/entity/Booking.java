package com.example.booking.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.SuperBuilder;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@EqualsAndHashCode(callSuper = true)
@NoArgsConstructor
@AllArgsConstructor
@Data
@SuperBuilder
@ToString(exclude = {"customer","bookingDetails"})
@Entity
@Table(name = "bookings")
public class Booking extends SuperEntity  {
    @Column(name = "total_price")
    private Double totalPrice;
    @Column(name = "start_date")
    private LocalDate startDate;
    @Column(name = "end_date")
    private LocalDate endDate;
    @Column
    @Enumerated(EnumType.STRING)
    private BookingStatus status;
    @OneToMany(mappedBy = "booking", cascade = CascadeType.ALL)
    @JsonBackReference("booking_detail_booking")
    private List<BookingDetail> bookingDetails;
    @ManyToOne
    @JoinColumn(name = "customer_id")
    @JsonManagedReference("booking_customer")
    private User customer;

}


