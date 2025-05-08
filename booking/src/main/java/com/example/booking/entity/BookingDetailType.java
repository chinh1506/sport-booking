package com.example.booking.entity;

public enum BookingDetailType {
    TIME("TIME"),
    MERCHANDISE("MERCHANDISE");

    private final String status;

    private BookingDetailType(String status) {
        this.status = status;
    }
}
