package com.example.booking.util.filterparam;

import lombok.Builder;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.experimental.SuperBuilder;

import java.time.LocalDate;

@EqualsAndHashCode(callSuper = true)
@Data
@SuperBuilder
public class BookingParam extends PageAndFilterParam {
        private LocalDate startDate;
        private String courtId;
        private String complexId;
}
