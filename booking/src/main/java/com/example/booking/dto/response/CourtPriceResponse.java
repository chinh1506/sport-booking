package com.example.booking.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CourtPriceResponse {
    private String id;
    private LocalTime startTime;
    private LocalTime endTime;
    private double price;
    private String description;
    private CourtResponse court;

}
