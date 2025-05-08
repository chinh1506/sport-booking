package com.example.booking.service.implement;

import com.example.booking.dto.request.CreateBookingRequest;
import com.example.booking.entity.*;
import com.example.booking.repository.BookingDetailRepository;
import com.example.booking.repository.BookingRepository;
import com.example.booking.repository.ComplexRepository;
import com.example.booking.repository.CourtPriceRepository;
import com.example.booking.service.BookingService;
import com.example.booking.util.Utilities;
import com.example.booking.util.filterparam.BookingParam;
import com.example.booking.util.filterparam.SortOrder;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
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
    private final CourtPriceRepository courtPriceRepository;
    private final BookingDetailRepository bookingDetailRepository;
    private final ComplexRepository complexRepository;


    public BookingServiceImpl(BookingRepository bookingRepository, CourtPriceRepository courtPriceRepository, BookingDetailRepository bookingDetailRepository, ComplexRepository complexRepository) {
        this.bookingRepository = bookingRepository;
        this.courtPriceRepository = courtPriceRepository;
        this.bookingDetailRepository = bookingDetailRepository;
        this.complexRepository = complexRepository;
    }

    @Override
    public Page<Booking> getAll(BookingParam param) {
        Sort sort = Sort.by(param.getOrderBy()).ascending();
        if (param.getOrder() == SortOrder.DESCENDING) {
            sort = sort.descending();
        }
        Pageable pageable = PageRequest.of(param.getPage(), param.getLimit(), sort);

        LocalDate startDate = param.getStartDate();
        Page<Booking> bookings = this.bookingRepository.findAllByConditions(param.getComplexId(), startDate, pageable);

        bookings.forEach(booking -> {
            List<BookingDetail> bookingDetails = this.bookingDetailRepository.findAllByBooking_Id(booking.getId());
            booking.setBookingDetails(bookingDetails);
        });
        return bookings;
    }

    @Override
    public Booking bookingCourt(CreateBookingRequest createBookingRequest) throws Exception {
        Booking booking = Booking.builder()
                .id(Utilities.generateID("BG"))
                .startDate(createBookingRequest.getStartDate())
                .endDate(createBookingRequest.getStartDate())
                .status(BookingStatus.PENDING)
                .build();
        List<CreateBookingRequest.TimeSlot> timeSlots = CreateBookingRequest.TimeSlot.mergeContinuousSlots(createBookingRequest.getTimeSlots());
        log.info("Time slots: {}", timeSlots);
        Complex complex = null;

        // check slot is available or not
        for (int i = 0; i < timeSlots.size(); i++) {
            CreateBookingRequest.TimeSlot timeSlot = timeSlots.get(i);
            List<Booking> bookingFound = this.bookingRepository
                    .findCourtByTimeAndCourtId(timeSlot.getCourtId(), booking.getStartDate(), timeSlot.getStartTime(), timeSlot.getEndTime());

            if (bookingFound != null && !bookingFound.isEmpty()) {
                throw new Exception("This court not available in this time.");
            }
            Complex foundComplex = this.complexRepository.findComplexByCourtId(timeSlot.getCourtId());
            assert foundComplex != null;
            if (i != 0 && !foundComplex.equals(complex)) {
                throw new Exception("Your booking is not valid");

            } else {
                complex = foundComplex;
            }
        }

        // create booking details
        List<CourtPrice> courtPricesDb = this.courtPriceRepository.findAllByCourt_Complex_Id(complex.getId());
        ArrayList<BookingDetail> bookingDetails = new ArrayList<>();

        //Calculate total price for booking
        double totalPrice = 0.0;
        for (CreateBookingRequest.TimeSlot timeSlot : timeSlots) {
            LocalTime endTime = timeSlot.getEndTime();
            LocalTime startTime= timeSlot.getStartTime();
            double lineTotal = 0.0;


            while (!endTime.equals(startTime)) {
                endTime = endTime.minusMinutes(30);
                for (CourtPrice courtPrice : courtPricesDb){
                    if (courtPrice.getStartTime().equals(startTime)|| courtPrice.getStartTime().isBefore(startTime) && courtPrice.getEndTime().isAfter(startTime)){
                        lineTotal+=courtPrice.getPrice();
                        break;
                    }
                }
            }
            BookingDetail bkgd = BookingDetail.builder()
                    .id(Utilities.generateID("BKGD"))
                    .court(Court.builder().id(timeSlot.getCourtId()).build())
                    .booking(booking)
                    .startTime(timeSlot.getStartTime())
                    .endTime(timeSlot.getEndTime())
                    .totalPrice(lineTotal / 2)
                    .build();
            totalPrice+=lineTotal;
            bookingDetails.add(bkgd);
        }
        booking.setTotalPrice(totalPrice);
        booking.setBookingDetails(bookingDetails);
        booking=this.bookingRepository.save(booking);

        return booking;
    }

    @Override
    public List<Booking> findByComplexIdAndStartDate(String complexId, LocalDate startDate) {
//        bookings= this.bookingRepository.
        return List.of();
    }

//    private double getTotalPrice(List<BookingDetail> bookingDetails) {
//        double totalPrice = 0.0;
//        for (BookingDetail bookingDetail : bookingDetails) {
//            totalPrice += bookingDetail.getTotalPrice();
//        }
//        return totalPrice;
//    }

}
