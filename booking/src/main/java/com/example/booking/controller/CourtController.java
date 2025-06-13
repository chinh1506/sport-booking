package com.example.booking.controller;

import com.example.booking.dto.response.ComplexResponse;
import com.example.booking.dto.response.CourtPriceResponse;
import com.example.booking.dto.response.CourtResponse;
import com.example.booking.entity.Complex;
import com.example.booking.entity.Court;
import com.example.booking.entity.CourtPrice;
import com.example.booking.service.CourtService;
import com.example.booking.util.RestResponse;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.modelmapper.ModelMapper;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@RestController
@RequestMapping("/courts")
public class CourtController {

    private final CourtService courtService;
    private final ModelMapper modelMapper;
    private final RedisTemplate<String, String> redisTemplate;
    private final ObjectMapper  objectMapper;

    public CourtController(CourtService courtService, ModelMapper modelMapper, RedisTemplate<String, String> redisTemplate, ObjectMapper objectMapper) {
        this.courtService = courtService;
        this.modelMapper = modelMapper;
        this.redisTemplate = redisTemplate;
        this.objectMapper = objectMapper;
    }

    @GetMapping(value = "{id}")
    public RestResponse<CourtResponse> getCourtById(@PathVariable String id) throws JsonProcessingException {
        String courtCache = this.redisTemplate.opsForValue().get(id);
//        System.out.println("courtCache: " + courtCache);
        if (courtCache != null) {
            System.out.println("courtCache: " + courtCache);

            CourtResponse courtResponse = this.objectMapper.readValue(courtCache, CourtResponse.class);

            return RestResponse.success(courtResponse);
        }


        Court court = this.courtService.getById(id);
        CourtResponse courtResponse = this.modelMapper.map(court, CourtResponse.class);
        this.redisTemplate.opsForValue().set(id, this.objectMapper.writeValueAsString(courtResponse));
        return RestResponse.success( courtResponse);
    }

    @GetMapping("complexes")
    public RestResponse<List<CourtResponse>> getCourtByComplexId(@RequestParam String complexId) {
        List<Court> courts=this.courtService.getByComplexId(complexId);
        List<CourtResponse> courtsRes = courts.stream().map(court -> modelMapper.map(court, CourtResponse.class)).toList();
        return RestResponse.success(courtsRes);
    }

    @GetMapping("prices")
    public RestResponse<List<CourtPriceResponse>> getCourtPriceByComplexId(@RequestParam String complexId) {
        List<CourtPrice> courtPrices = this.courtService.getCourtPriceByComplexId(complexId);
        List<CourtPriceResponse> courtPricesResponse = courtPrices.stream().map(courtPrice -> this.modelMapper.map(courtPrice, CourtPriceResponse.class)).collect(Collectors.toList());
        return RestResponse.success(courtPricesResponse);
    }
}
