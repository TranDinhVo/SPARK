package com.javaweb.service;

import com.javaweb.model.dto.BudgetDTO;
import com.javaweb.model.request.BudgetRequest;

import java.util.List;

public interface BudgetService {
    List<BudgetDTO> getAllBudgets(Long userId);
    
    BudgetDTO getBudgetById(Long userId, Long budgetId);
    
    BudgetDTO createBudget(BudgetRequest budgetRequest);
    
    BudgetDTO updateBudget(Long userId, Long budgetId, BudgetRequest budgetRequest);
    
    void deleteBudget(Long userId, Long budgetId);
}