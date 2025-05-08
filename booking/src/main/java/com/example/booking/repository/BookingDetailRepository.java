package com.example.booking.repository;

import com.example.booking.entity.BookingDetail;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;

public interface BookingDetailRepository extends JpaRepository<BookingDetail, String> {
    List<BookingDetail> findAllByBooking_Id(String bookingId);

    List<BookingDetail> findAllByBooking_IdAndBooking_StartDate(String bookingId, LocalDate bookingStartDate);

}
