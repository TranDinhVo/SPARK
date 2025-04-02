package com.javaweb.service;
import com.javaweb.model.BudgetResponseDTO;
import java.util.List;

public interface BudgetService {
    // Retrieve list of budget DTOs by user ID
    List<BudgetResponseDTO> getBudgetsByUserId(Long userId);
    
    // Retrieve a single budget DTO by budget ID
    BudgetResponseDTO getBudgetById(Long budgetId);
}