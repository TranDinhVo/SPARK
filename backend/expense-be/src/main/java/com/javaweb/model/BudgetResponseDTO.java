package com.javaweb.model;

import java.math.BigDecimal;
import java.time.LocalDate;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class BudgetResponseDTO {
    private BigDecimal amountLimit;
    private LocalDate startDay;
    private LocalDate endDay;
    private String category;
    private BigDecimal amountCurrent;
}