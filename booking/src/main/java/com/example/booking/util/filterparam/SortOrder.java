package com.example.booking.util.filterparam;

public enum SortOrder {
    DESCENDING("DESCENDING"),
    ASCENDING("ASCENDING");

    private final String sort;

    SortOrder(String sort) {
        this.sort = sort;
    }
}
