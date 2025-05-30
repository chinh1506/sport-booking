package com.example.booking.controller;

import com.example.booking.dto.response.CourtResponse;
import com.example.booking.service.CourtService;
import com.example.booking.util.RestResponse;
import org.modelmapper.ModelMapper;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

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
        return null;
    }

}
