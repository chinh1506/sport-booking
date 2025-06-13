package com.example.booking.controller;

import com.example.booking.dto.response.ComplexResponse;
import com.example.booking.entity.Complex;
import com.example.booking.service.BookingService;
import com.example.booking.service.ComplexService;
import com.example.booking.util.RestResponse;
import com.example.booking.util.filterparam.ComplexParam;
import com.example.booking.util.filterparam.SortOrder;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;

@RestController
@RequestMapping("/complexes")
public class ComplexController {
    private final ComplexService complexService;
    private final ModelMapper modelMapper;

    public ComplexController(ComplexService complexService, ModelMapper modelMapper) {
        this.complexService = complexService;
        this.modelMapper = modelMapper;
    }


    @GetMapping
    public RestResponse<Page<?>> findAll(@RequestParam(required = false) String name,
                                         @RequestParam(defaultValue = "0") int page,
                                         @RequestParam(defaultValue = "1000") int limit,
                                         @RequestParam(defaultValue = "createdAt") String orderBy,
                                         @RequestParam(defaultValue = "DESCENDING") SortOrder order) {
        ComplexParam param= ComplexParam.builder()
                .name(name)
                .order(order)
                .page(page)
                .limit(limit)
                .orderBy(orderBy)
                .build();

        Page<Complex> servicePage = this.complexService.findAll(param);
        Page<ComplexResponse> complexResponses= servicePage.map(s->modelMapper.map(s, ComplexResponse.class));
        return RestResponse.success(complexResponses);
    }
}
