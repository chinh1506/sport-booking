package com.example.booking.service;

import com.example.booking.entity.CourtPrice;
import com.example.booking.repository.CourtPriceRepository;

import java.util.List;

public interface CourtPriceService {
    List<CourtPrice> getAll();
    List<CourtPrice> getByComplexId(String complexId);

}
