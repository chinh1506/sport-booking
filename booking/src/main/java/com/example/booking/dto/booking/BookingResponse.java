package com.example.booking.dto.booking;

import com.example.booking.entity.BookingStatus;
import com.example.booking.entity.SportField;

import java.time.LocalDateTime;

public class BookingResponse {
    private String id;
    private LocalDateTime startTime;
    private LocalDateTime endTime;
    private Double totalPrice;
    private BookingStatus status;
//    private String sportFieldId;

}
