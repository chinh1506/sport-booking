package com.example.booking.service.implement;

import com.example.booking.entity.Booking;
import com.example.booking.entity.BookingStatus;
import com.example.booking.repository.BookingRepository;
import com.example.booking.service.BookingService;
import com.example.booking.util.filterparam.BookingParam;
import com.example.booking.util.filterparam.SortOrder;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalTime;

@Service
@Slf4j
public class BookingServiceImpl implements BookingService {
    private final BookingRepository bookingRepository;

    public BookingServiceImpl(BookingRepository bookingRepository) {
        this.bookingRepository = bookingRepository;
    }

    @Override
    public Page<Booking> getAll(BookingParam param) {
        Sort sort = Sort.by(param.getOrderBy()).ascending();
        if (param.getOrder() == SortOrder.DESCENDING) {
            sort = sort.descending();
        }
        Pageable pageable = PageRequest.of(param.getPage(), param.getLimit(), sort);

        LocalDate startDate = param.getStartDate();
        log.info("{}", startDate);

        return this.bookingRepository.findAllBookingPage(startDate, pageable);
    }

    @Override
    public Booking bookingField(String fieldId, LocalDate startDate, LocalDate endDate, LocalTime startTime, LocalTime endTime, String userId) {
        Booking booking = Booking.builder()
                .startDate(startDate)
                .endDate(endDate)
                .startTime(startTime)
                .endTime(endTime)
                .status(BookingStatus.PENDING)
                .build();

        LocalDate date = LocalDate.parse("2025-01-22");
        LocalTime bookingStartTime = LocalTime.parse("06:00");
        LocalTime bookingEndTime = LocalTime.parse("08:10");
        var bookingFound = this.bookingRepository.findFieldByTime(date, bookingStartTime, bookingEndTime);
        var bookingFound1 = this.bookingRepository.findFieldByTimeAndFieldId("1", date, bookingStartTime, bookingEndTime);
        log.info("{}", bookingFound);

        return bookingFound1;
    }
}
