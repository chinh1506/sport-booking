package com.example.booking.repository;

import com.example.booking.entity.FieldPrice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalTime;
import java.util.Optional;

public interface FieldPriceRepository extends JpaRepository<FieldPrice, String> {

    @Query(value = "select fp " +
            "from FieldPrice fp " +
            "where :startTime >= fp.startTime and :startTime < fp.endTime")
    FieldPrice findFieldPriceByStartTime(LocalTime startTime);

}
