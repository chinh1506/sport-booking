package com.example.booking.service.implement;

import com.example.booking.repository.BookingRepository;
import com.example.booking.service.BookingService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BookingServiceImpl implements BookingService {
    private final BookingRepository bookingRepository;

    public BookingServiceImpl(BookingRepository bookingRepository) {
        this.bookingRepository = bookingRepository;
    }

    @Override
    public List<?> getAll() {
        return this.bookingRepository.findAll();
    }
}
