package com.example.booking.dto.request;

import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;

@Data
public class CreateBookingRequest {
//    @NotBlank(message = "CourtId could not be blank")
//    private String courtId;
//    @NotBlank(message = "startDate could not be blank")
    @FutureOrPresent(message = "startDate should not be in the the past")
//    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    private LocalDate startDate;
//    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "HH:mm")
//    @NotNull(message = "StartTime could not be blank")
//    private LocalTime startTime;
//    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "HH:mm")
//    @NotBlank(message = "CourtId could not be blank")
//    private LocalTime endTime;
    @Email(message = "Email is not valid")
    private String email;
//    @NotEmpty(message = "TimeSlot could not be empty")
    private List<TimeSlot> timeSlots;

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class TimeSlot{
        @NotBlank(message = "startTime could not be blank")
        private LocalTime startTime;
        @NotBlank(message = "endTime could not be blank")
        private LocalTime endTime;
        @NotBlank(message = "CourtId could not be blank")
        private String courtId;

        public static List<TimeSlot> mergeContinuousSlots(List<TimeSlot> slots) {
            if (slots == null || slots.isEmpty()) {
                return Collections.emptyList();
            }

            // Sắp xếp theo courtId, startTime
            slots.sort(Comparator.comparing(TimeSlot::getCourtId)
                    .thenComparing(TimeSlot::getStartTime));

            List<TimeSlot> merged = new ArrayList<>();
            TimeSlot current = slots.get(0);

            for (int i = 1; i < slots.size(); i++) {
                TimeSlot next = slots.get(i);

                if (current.getCourtId().equals(next.getCourtId()) &&
                        current.getEndTime().equals(next.getStartTime())) {
                    // Gộp: kéo dài endTime
                    current = new TimeSlot(current.getStartTime(), next.getEndTime(), current.getCourtId());
                } else {
                    // Không gộp được, thêm vào danh sách
                    merged.add(current);
                    current = next;
                }
            }

            // Đừng quên thêm slot cuối cùng
            merged.add(current);

            return merged;
        }
    }
}


