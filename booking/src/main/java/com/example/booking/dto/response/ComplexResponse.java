package com.example.booking.dto.response;

import com.example.booking.entity.Address;
import com.example.booking.entity.Court;
import com.example.booking.entity.User;

import java.time.LocalTime;
import java.util.List;

public class ComplexResponse {
    private String name;
    private String description;
    private LocalTime openTime;
    private LocalTime closeTime;
    private User owner;
    private List<Court> courts;
    private Address address;
}
