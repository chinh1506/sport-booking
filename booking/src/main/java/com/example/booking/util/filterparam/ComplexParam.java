package com.example.booking.util.filterparam;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.experimental.SuperBuilder;

@EqualsAndHashCode(callSuper = true)
@Data
@SuperBuilder
public class ComplexParam extends PageAndFilterParam {
    private String name;
}
