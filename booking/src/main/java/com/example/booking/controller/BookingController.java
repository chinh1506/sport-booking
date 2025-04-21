package com.example.booking.controller;

import com.example.booking.dto.response.BookingResponse;
import com.example.booking.dto.request.CreateBookingRequest;
import com.example.booking.entity.Booking;
import com.example.booking.service.BookingService;
import com.example.booking.util.RestResponse;
import com.example.booking.util.filterparam.BookingParam;
import com.example.booking.util.filterparam.SortOrder;
import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@Slf4j
@RestController
@RequestMapping("/bookings")
public class BookingController {
    private final BookingService bookingService;
    private ModelMapper modelMapper;


    public BookingController(BookingService bookingService, ModelMapper modelMapper) {
        this.bookingService = bookingService;
        this.modelMapper = modelMapper;
    }

    @GetMapping()
    public RestResponse<List<?>> getAll(@RequestParam(required = false) LocalDate startDate,
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
//        log.info("bookings count: {}", params);
        Page<Booking> bookings = this.bookingService.getAll(params);

        log.info("bookings count: {}", bookings.getTotalElements());
        List<BookingResponse> bookingsRes = bookings.stream()
                .map(o -> modelMapper.map(o, BookingResponse.class))
                .toList();
        return RestResponse.success(bookingsRes);
    }

    @PostMapping()
    public RestResponse<BookingResponse> bookCourt(@Valid @RequestBody CreateBookingRequest createBookingRequest) throws Exception {
        Booking booking = this.bookingService.bookingCourt(createBookingRequest.getCourtId()
                , createBookingRequest.getStartDate()
                , null
                , createBookingRequest.getStartTime()
                , createBookingRequest.getEndTime()
                , createBookingRequest.getEmail());

        return RestResponse.success(modelMapper.map(booking, BookingResponse.class));
    }

    @MessageMapping("/courts")
    @SendTo("/topic/courts")
    public RestResponse<BookingResponse> bookingCourtRealtime(@Valid @RequestBody CreateBookingRequest createBookingRequest) throws Exception {
        Booking booking = this.bookingService.bookingCourt(createBookingRequest.getCourtId()
                , createBookingRequest.getStartDate()
                , null
                , createBookingRequest.getStartTime()
                , createBookingRequest.getEndTime()
                , createBookingRequest.getEmail());
        return RestResponse.success(modelMapper.map(booking, BookingResponse.class));
    }

}
