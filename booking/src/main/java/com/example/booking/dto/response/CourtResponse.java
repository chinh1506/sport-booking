package com.example.booking.dto.response;

import lombok.Data;

@Data
public class CourtResponse {
    private String id;
    private String name;
    private String description;
    private String type;
    private ComplexResponse complex;

}
