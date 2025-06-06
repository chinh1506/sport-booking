package com.example.booking.repository;

import com.example.booking.entity.Booking;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

public interface BookingRepository extends JpaRepository<Booking, String>{

    @Query(value = "select b " +
            "from Booking as  b " +
            "where b.startDate = :startDate and ((b.startTime >= :startTime and b.startTime < :endTime) " +
            "or " +
            "(b.endTime >= :startTime and b.endTime < :endTime))")
    Booking findFieldByTime(LocalDate startDate, LocalTime startTime, @Param("endTime") LocalTime endTime);

    @Query(value = "select b " +
            "from Booking as b " +
            "where b.court.id = :fieldId and b.startDate = :startDate and ((b.startTime >= :startTime and b.startTime < :endTime) " +
            "or " +
            "(b.endTime > :startTime and b.endTime <= :endTime))")
    List<Booking> findFieldByTimeAndFieldId(String fieldId, LocalDate startDate, LocalTime startTime, @Param("endTime") LocalTime endTime);

    List<Booking> findAllByStartDateAndCourt_Id(LocalDate startDate, String sportField_id);

    @Query(value = "select b " +
            "       from Booking b " +
            "       where (cast(:startDate as date ) is null or b.startDate = :startDate)")
    Page<Booking> findAllBookingPage(LocalDate startDate,Pageable pageable);



}
