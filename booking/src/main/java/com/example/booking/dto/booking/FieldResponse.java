package com.example.booking.dto.booking;

import com.example.booking.entity.FieldType;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.Data;

@Data
public class FieldResponse {
    private String id;
    private String name;
    private String description;
    private String type;
}
