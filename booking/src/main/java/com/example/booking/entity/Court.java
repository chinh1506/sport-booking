package com.example.booking.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.SuperBuilder;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.util.Date;
import java.util.List;

@Table(name = "courts")
@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@SuperBuilder
@ToString(exclude = {"courtPrices"})
public class Court{
    @Id
    private String id;

    private String name;

    private String description;
    @Enumerated(EnumType.STRING)
    private CourtType type;
    @ManyToOne
    @JoinColumn(name = "complex_id")
    @JsonBackReference
    private Complex complex;

    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private Date createdAt;
    @UpdateTimestamp
    @Column(name = "updated_at")
    private Date updatedAt;
    @OneToMany(mappedBy = "court")
    @JsonBackReference(value = "court_price")
    private List<CourtPrice> courtPrices;


}
