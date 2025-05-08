package com.example.booking.repository;

import com.example.booking.entity.Complex;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface ComplexRepository extends JpaRepository<Complex, String> {

    @Query(value = "select cx from Complex cx " +
            "JOIN cx.courts c " +
            "where c.id=:courtId")
    Complex findComplexByCourtId(String courtId);
}
