package com.example.booking.service;

import com.example.booking.entity.Court;

import java.util.List;

public interface CourtService {

    List<Court> getAll();
    Court getById(int id);
    List<Court> getByComplexId(String complexId);
}
