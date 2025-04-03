package com.example.booking.util.filterparam;

import lombok.Builder;
import lombok.Data;
import lombok.experimental.SuperBuilder;

import javax.swing.*;
import java.time.LocalDate;

@Data
@SuperBuilder
public abstract class PageAndFilterParam {

    private int page;
    private int limit;
    private String orderBy;
    private SortOrder order;
    private LocalDate createdAt;
    private LocalDate updatedAt;
}
