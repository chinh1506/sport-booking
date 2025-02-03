package com.example.booking.service;

import com.example.booking.entity.Booking;
import com.example.booking.util.filterparam.BookingParam;
import org.springframework.data.domain.Page;

import java.time.LocalDate;
import java.time.LocalTime;

public interface BookingService {
    Page<Booking> getAll(BookingParam filterParam);
    Booking bookingField(String fieldId, LocalDate startDate, LocalDate endDate, LocalTime startTime, LocalTime endTime, String userId);
//    List<Booking> findByStartDateAnd(LocalDate startDate);
}
