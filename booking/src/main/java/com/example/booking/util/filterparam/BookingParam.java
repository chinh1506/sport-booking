package com.example.booking.util.filterparam;

import lombok.Builder;
import lombok.Data;
import lombok.experimental.SuperBuilder;

import java.time.LocalDate;

@Data
@SuperBuilder
public class BookingParam extends PageAndFilterParam {
        private LocalDate startDate;
        private String courtId;
        private String complexId;
}
