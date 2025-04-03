package com.example.booking.repository;

import com.example.booking.entity.Court;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CourtRepository extends JpaRepository<Court, Integer> {

    List<Court> findByComplex_Id(String complex_Id);
}
