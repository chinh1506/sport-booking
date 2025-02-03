package com.example.booking.controller;

import com.example.booking.dto.booking.BookingResponse;
import com.example.booking.entity.Booking;
import com.example.booking.service.BookingService;
import com.example.booking.util.RestResponse;
import com.example.booking.util.filterparam.BookingParam;
import com.example.booking.util.filterparam.SortOrder;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

@Slf4j
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
    public RestResponse getAll(@RequestParam LocalDate startDate,
                               @RequestParam(defaultValue = "0") int page,
                               @RequestParam(defaultValue ="10" ) int limit,
                               @RequestParam(defaultValue = "createdAt") String orderBy,
                               @RequestParam(defaultValue = "DESCENDING") SortOrder order) {

        BookingParam params = BookingParam.builder()
                .startDate(startDate)
                .page(page)
                .limit(limit)
                .orderBy(orderBy)
                .order(order)
                .build();
        log.info("bookings count: {}", params);

        Page<Booking> bookings = this.bookingService.getAll(params);

//        List<BookingResponse> bookingsRes = bookings.stream()
//                .map(o -> objectMapper.convertValue(o, BookingResponse.class))
//                .toList();

        return RestResponse.success(bookings);
    }

    @PostMapping("/fields")
    public Booking bookField() {
        Booking bookings = this.bookingService.bookingField(null, null, null, null, null, null);
        return bookings;
    }

}
