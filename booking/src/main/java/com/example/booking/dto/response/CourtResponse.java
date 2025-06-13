package com.example.booking.dto.response;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.databind.PropertyNamingStrategy;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
//@JsonNaming(PropertyNamingStrategy.UpperCamelCaseStrategy.class)
//@JsonIgnoreProperties(ignoreUnknown = true)
public class CourtResponse {
    private String id;
    private String name;
    private String description;
    private String type;
//    @JsonIgnore
    private ComplexResponse complex;

}
