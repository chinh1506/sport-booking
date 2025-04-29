package com.example.booking.service.implement;

import com.example.booking.entity.CourtPrice;
import com.example.booking.repository.CourtPriceRepository;
import com.example.booking.service.CourtPriceService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CourtPriceServiceImpl implements CourtPriceService {
    private final CourtPriceRepository courtPriceRepository;

    public CourtPriceServiceImpl(CourtPriceRepository courtPriceRepository) {
        this.courtPriceRepository = courtPriceRepository;
    }

    @Override
    public List<CourtPrice> getAll() {
        return List.of();
    }

    @Override
    public List<CourtPrice> getByComplexId(String complexId) {
        return List.of();
    }
}
