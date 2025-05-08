package com.example.booking.dto.response;

import com.example.booking.entity.BookingStatus;
import lombok.Data;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.Date;
import java.util.List;

@Data
public class BookingResponse {

    private String id;
    private LocalDate startDate;
    private LocalDate endDate;
    private Double totalPrice;
    private BookingStatus status;
    private UserResponse customer;
    private Date createdAt;
    private Date updatedAt;
    private List<BookingDetailResponse> bookingDetails;
//    private CourtResponse court;

}
