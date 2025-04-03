package com.example.booking.dto.request;

import jakarta.validation.constraints.FutureOrPresent;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.time.LocalDate;
import java.time.LocalTime;

@Data
public class CreateBookingRequest {
    @NotBlank(message = "FieldId could not be blank")
    private String fieldId;
    @NotNull(message = "startDate could not be blank")
    @FutureOrPresent(message = "startDate is not valid")
//    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    private LocalDate startDate;
//    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "HH:mm")
    @NotNull(message = "StartTime could not be blank")
    private LocalTime startTime;
//    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "HH:mm")
    @NotNull(message = "endTime could not be blank")
    private LocalTime endTime;
    private String email;
}
