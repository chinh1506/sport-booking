package com.example.booking.service.implement;

import com.example.booking.entity.Court;
import com.example.booking.entity.CourtPrice;
import com.example.booking.repository.CourtPriceRepository;
import com.example.booking.repository.CourtRepository;
import com.example.booking.service.CourtService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;

@Service
public class CourtServiceImpl implements CourtService {
    private final CourtRepository courtRepository;
    private final CourtPriceRepository courtPriceRepository;
    private final RedisTemplate<String, String> redisTemplate;
    private final ObjectMapper objectMapper;

    public CourtServiceImpl(CourtRepository courtRepository, CourtPriceRepository courtPriceRepository, RedisTemplate<String,String> redisTemplate, ObjectMapper objectMapper) {
        this.courtRepository = courtRepository;
        this.courtPriceRepository = courtPriceRepository;
        this.redisTemplate = redisTemplate;
        this.objectMapper = objectMapper;
    }

    @Override
    public List<Court> getAll() {
        return this.courtRepository.findAll();
    }

    @Override
    public Court getById(String id) {


        Court court = this.courtRepository.findById(id).get();
        return court;
    }

    @Override
    public List<Court> getByComplexId(String complexId) {
        return  this.courtRepository.findByComplex_Id(complexId);
    }

    @Override
    public List<CourtPrice> getCourtPriceByComplexId(String complexId) {
        return this.courtPriceRepository.findAllByCourt_Complex_Id(complexId);
    }
}
