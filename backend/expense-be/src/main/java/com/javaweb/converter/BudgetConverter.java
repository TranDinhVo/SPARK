package com.javaweb.converter;

import com.javaweb.entity.BudgetEntity;
import com.javaweb.model.dto.BudgetDTO;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;

@Component
public class BudgetConverter {

    public BudgetDTO convertToDTO(BudgetEntity budget, BigDecimal currentSpending) {
        BudgetDTO dto = new BudgetDTO();
        dto.setId(budget.getId());
        dto.setAmountLimit(budget.getAmountLimit());
        dto.setStartDate(budget.getStartDate());
        dto.setEndDate(budget.getEndDate());
        dto.setCategory(budget.getCategoryBudget().getName());
        dto.setAlertThreshold(budget.getAlertThreshold());
        dto.setMoneyCurrent(currentSpending);
        
        return dto;
    }
}