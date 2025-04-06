package com.javaweb.model.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class BudgetRequest {
    private Long userId;
    private Long categoryId;
    private BigDecimal amountLimit;
    private LocalDate startDate;
    private LocalDate endDate;
    private Float alertThreshold;
}