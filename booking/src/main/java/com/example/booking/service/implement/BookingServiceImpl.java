package com.example.booking.service.implement;

import com.example.booking.entity.*;
import com.example.booking.repository.BookingRepository;
import com.example.booking.repository.CourtPriceRepository;
import com.example.booking.service.BookingService;
import com.example.booking.util.Utilities;
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
import java.util.ArrayList;
import java.util.List;

@Service
@Slf4j
public class BookingServiceImpl implements BookingService {
    private final BookingRepository bookingRepository;
    private final CourtPriceRepository fieldPriceRepository;

    public BookingServiceImpl(BookingRepository bookingRepository, CourtPriceRepository fieldPriceRepository) {
        this.bookingRepository = bookingRepository;
        this.fieldPriceRepository = fieldPriceRepository;
    }

    @Override
    public Page<Booking> getAll(BookingParam param) {
        Sort sort = Sort.by(param.getOrderBy()).ascending();
        if (param.getOrder() == SortOrder.DESCENDING) {
            sort = sort.descending();
        }
        Pageable pageable = PageRequest.of(param.getPage(), param.getLimit(), sort);

        LocalDate startDate = param.getStartDate();


        return this.bookingRepository.findAllBookingPage(startDate, pageable);
    }

    @Override
    public Booking bookingField(String fieldId, LocalDate startDate, LocalDate endDate, LocalTime startTime, LocalTime endTime, String userId) throws Exception {
        Booking booking = Booking.builder()
                .id(Utilities.generateID("BG"))
                .startDate(startDate)
                .endDate(endDate)
                .startTime(startTime)
                .endTime(endTime)
                .status(BookingStatus.PENDING)
                .court(Court.builder().id(fieldId).build())
                .build();

        List<Booking> bookingFound = this.bookingRepository.findFieldByTimeAndFieldId(fieldId, startDate, startTime, endTime);
        if (bookingFound != null && !bookingFound.isEmpty()) {
            throw new Exception("This field not available in this time.");
        }
        List<CourtPrice> fieldPrices = new ArrayList<>();

        while (!endTime.equals(startTime)) {
            endTime = endTime.minusMinutes(30);
            CourtPrice fieldPrice = this.fieldPriceRepository.findFieldPriceByStartTime(endTime);
            fieldPrices.add(fieldPrice);
        }
        log.info("{}", fieldPrices);
        booking.setTotalPrice(fieldPrices.stream().map(CourtPrice::getPrice).reduce(0.00, Double::sum) / 2);
        return this.bookingRepository.save(booking);
    }
}
