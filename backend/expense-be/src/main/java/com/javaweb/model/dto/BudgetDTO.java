package com.javaweb.model.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class BudgetDTO {
    private Long id;
    private BigDecimal amountLimit;
    private LocalDate startDate;
    private LocalDate endDate;
    private String category;
    private BigDecimal moneyCurrent;
    private Float alertThreshold;
    
 
    public BigDecimal getMoneyCurrent() {
        return moneyCurrent;
    }
    
    public void setMoneyCurrent(BigDecimal moneyCurrent) {
        this.moneyCurrent = moneyCurrent;
    }
    
    public Float getAlertThreshold() {
        return alertThreshold;
    }
    
    public void setAlertThreshold(Float alertThreshold) {
        this.alertThreshold = alertThreshold;
    }
}