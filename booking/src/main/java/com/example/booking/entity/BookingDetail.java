package com.example.booking.entity;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.Date;

@Entity
@Table(name = "booking_details")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class BookingDetail{

    @Id
    private String id;
    private String name;

    private LocalTime startTime;
    @Column(name = "end_time")
    private LocalTime endTime;
    @Enumerated(EnumType.STRING)
    @Column
    private BookingDetailType type;
    private int quantity;
    private String description;
    @Column(name = "total_price")
    private double totalPrice;
    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private Date createdAt;
    @UpdateTimestamp
    @Column(name = "updated_at")
    private Date updatedAt;

    @ManyToOne
    @JoinColumn(name = "court_id")
    @JsonManagedReference(value = "booking_detail_court")
    private Court court;

    @ManyToOne
    @JoinColumn(name = "booking_id")
    @JsonManagedReference(value = "booking_detail_booking")
    private Booking booking;

}
