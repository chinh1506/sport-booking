package com.example.booking.controller;

import com.example.booking.dto.response.ComplexResponse;
import com.example.booking.dto.response.CourtPriceResponse;
import com.example.booking.dto.response.CourtResponse;
import com.example.booking.entity.Complex;
import com.example.booking.entity.Court;
import com.example.booking.entity.CourtPrice;
import com.example.booking.service.CourtService;
import com.example.booking.util.RestResponse;
import org.modelmapper.ModelMapper;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@RestController
@RequestMapping("/courts")
public class CourtController {

    private final CourtService courtService;
    private final ModelMapper modelMapper;

    public CourtController(CourtService courtService, ModelMapper modelMapper) {
        this.courtService = courtService;
        this.modelMapper = modelMapper;
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
