package com.example.booking.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "promotions")
public class Promotion extends SuperEntity{
    private String name;
    private String description;
    private LocalDateTime startDate;
    private LocalDateTime endDate;
}
