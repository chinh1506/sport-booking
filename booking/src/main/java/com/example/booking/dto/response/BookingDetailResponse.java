package com.example.booking.dto.response;

import com.example.booking.entity.Booking;
import com.example.booking.entity.BookingDetailType;
import com.example.booking.entity.Court;
import lombok.Data;

import java.time.LocalDate;
import java.time.LocalTime;

@Data
public class BookingDetailResponse {
    private String id;
    private String name;
    private LocalTime startTime;
    private LocalTime endTime;
    private BookingDetailType type;
    private int quantity;
    private String description;
    private double totalPrice;
    private CourtResponse court;
//    private Booking booking;
}
