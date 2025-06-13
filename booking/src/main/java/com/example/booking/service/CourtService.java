package com.example.booking.service;

import com.example.booking.entity.Court;
import com.example.booking.entity.CourtPrice;
import com.fasterxml.jackson.core.JsonProcessingException;

import java.util.List;

public interface CourtService {

    List<Court> getAll();
    Court getById(String id);
    List<Court> getByComplexId(String complexId);
    List<CourtPrice> getCourtPriceByComplexId(String complexId);
}
