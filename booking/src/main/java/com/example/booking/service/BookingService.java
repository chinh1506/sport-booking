package com.example.booking.service;

import com.example.booking.dto.request.CreateBookingRequest;
import com.example.booking.entity.Booking;
import com.example.booking.util.filterparam.BookingParam;
import org.springframework.data.domain.Page;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

public interface BookingService {
    Page<Booking> getAll(BookingParam filterParam);
    Booking bookingCourt(CreateBookingRequest createBookingRequest) throws Exception;
    List<Booking> findByComplexIdAndStartDate(String complexId,LocalDate startDate);
}
