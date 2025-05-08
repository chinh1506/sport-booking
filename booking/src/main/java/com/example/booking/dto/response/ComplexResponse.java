package com.example.booking.dto.response;

import com.example.booking.entity.Address;
import com.example.booking.entity.Complex;
import com.example.booking.entity.Court;
import com.example.booking.entity.User;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeMap;

import java.time.LocalTime;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ComplexResponse {
    private String id;
    private String name;
    private String description;
    private LocalTime openTime;
    private LocalTime closeTime;
//    @JsonIgnore
    private User owner;
    private Address address;


}
