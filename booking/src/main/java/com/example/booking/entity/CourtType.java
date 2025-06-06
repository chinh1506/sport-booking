package com.example.booking.entity;

import lombok.Getter;

/*
môn thể thao gì, cầu lông hay bóng chuyền, bóng rổ, đá bóng
 */
@Getter
public enum CourtType {
    BADMINTON("BADMINTON"),
    FOOTBALL("FOOTBALL"),
    BASKETBALL("BASKETBALL"),
    TENNIS("TENNIS"),
    SWIMMING("SWIMMING"),
    TRACK("TRACK")

    ;

    private final String type;
    private CourtType(String type) {
        this.type = type;
    }
}
