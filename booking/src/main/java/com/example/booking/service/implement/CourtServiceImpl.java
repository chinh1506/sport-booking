package com.example.booking.service.implement;

import com.example.booking.entity.Court;
import com.example.booking.repository.CourtRepository;
import com.example.booking.service.CourtService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CourtServiceImpl implements CourtService {
    private final CourtRepository courtRepository;

    public CourtServiceImpl(CourtRepository courtRepository) {
        this.courtRepository = courtRepository;
    }

    @Override
    public List<Court> getAll() {
        return this.courtRepository.findAll();
    }

    @Override
    public Court getById(int id) {
        return this.courtRepository.findById(id).get();
    }

    @Override
    public List<Court> getByComplexId(String complexId) {
        return  this.courtRepository.findByComplex_Id(complexId);
    }
}
