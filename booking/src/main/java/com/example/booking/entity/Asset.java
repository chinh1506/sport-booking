package com.example.booking.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Table(name = "assets")
@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Asset extends SuperEntity{
    private String type;
    private String url;
}
