package com.example.booking.repository;

import com.example.booking.entity.CourtPrice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalTime;
import java.util.List;

public interface CourtPriceRepository extends JpaRepository<CourtPrice, String> {

    @Query(value = "select fp " +
            "from CourtPrice fp " +
            "where :startTime >= fp.startTime and :startTime < fp.endTime")
    CourtPrice findCourtPriceByStartTime(LocalTime startTime);

    List<CourtPrice> findAllByCourt_Id(String courtId);

    List<CourtPrice> findAllByCourt_Complex_Id(String complexId);

}
