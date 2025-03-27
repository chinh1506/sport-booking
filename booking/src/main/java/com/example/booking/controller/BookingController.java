package com.example.booking.controller;

import com.example.booking.dto.booking.BookingResponse;
import com.example.booking.dto.booking.CreateBookingRequest;
import com.example.booking.entity.Booking;
import com.example.booking.service.BookingService;
import com.example.booking.util.RestResponse;
import com.example.booking.util.filterparam.BookingParam;
import com.example.booking.util.filterparam.SortOrder;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

@Slf4j
@RestController
@RequestMapping("/bookings")
public class BookingController {
    private final BookingService bookingService;
    private ModelMapper modelMapper ;


    public BookingController(BookingService bookingService, ModelMapper modelMapper ) {
        this.bookingService = bookingService;
        this.modelMapper = modelMapper;
    }

    @GetMapping()
    public Object getAll(@RequestParam(required = false) LocalDate startDate,
                               @RequestParam(defaultValue = "0") int page,
                               @RequestParam(defaultValue = "10") int limit,
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

        log.info("bookings count: {}", bookings.getTotalElements());
        List<BookingResponse> bookingsRes = bookings.stream()
                .map(o -> modelMapper.map(o, BookingResponse.class))
                .toList();

        return RestResponse.success(bookingsRes);
//        return bookings;
    }

    @PostMapping()
    public BookingResponse bookField(@Valid @RequestBody CreateBookingRequest createBookingRequest) throws Exception {
        Booking booking = this.bookingService.bookingField(createBookingRequest.getFieldId()
                , createBookingRequest.getStartDate()
                , null
                , createBookingRequest.getStartTime()
                , createBookingRequest.getEndTime()
                , createBookingRequest.getEmail());

        return modelMapper.map(booking, BookingResponse.class);
    }
    @MessageMapping("/fields")
    @SendTo("/topic/fields")
    public BookingResponse bookingFieldRealtime(@Valid @RequestBody CreateBookingRequest createBookingRequest) throws Exception {
        Booking booking = this.bookingService.bookingField(createBookingRequest.getFieldId()
                , createBookingRequest.getStartDate()
                , null
                , createBookingRequest.getStartTime()
                , createBookingRequest.getEndTime()
                , createBookingRequest.getEmail());
        return modelMapper.map(booking, BookingResponse.class);
    }

}
