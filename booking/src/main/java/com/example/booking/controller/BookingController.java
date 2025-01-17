package com.example.booking.controller;

import com.example.booking.dto.booking.BookingResponse;
import com.example.booking.service.BookingService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/bookings")
public class BookingController {
    private final BookingService bookingService;
    private final ObjectMapper objectMapper;

    public BookingController(BookingService bookingService, ObjectMapper objectMapper) {
        this.bookingService = bookingService;
        this.objectMapper = objectMapper;
    }

    @GetMapping()
    public List getAll() {
        List<?> bookings = this.bookingService.getAll();

//        List<BookingResponse> bookingsRes = bookings.stream()
//                .map(o -> objectMapper.convertValue(o, BookingResponse.class))
//                .toList();
        return bookings;
    }

}
