package com.example.booking.dto.booking;

import com.example.booking.entity.BookingStatus;
import com.example.booking.entity.SportField;
import lombok.Data;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.Date;

@Data
public class BookingResponse {
    private String id;
    private LocalDate startDate;
    private Date createdAt;
    private LocalTime startTime;
    private LocalTime endTime;
    private Double totalPrice;
    private BookingStatus status;

    private FieldResponse sportField;

}
