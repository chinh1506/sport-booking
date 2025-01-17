package com.example.booking.entity;

import lombok.Getter;

@Getter
public enum BookingStatus {
    CONFIRMED("CONFIRMED"),
    PENDING("PENDING"),
    CANCELLED("CANCELLED"),
    COMPLETED("COMPLETED");

    private final String status;

    private BookingStatus(String status) {
        this.status = status;
    }
}
