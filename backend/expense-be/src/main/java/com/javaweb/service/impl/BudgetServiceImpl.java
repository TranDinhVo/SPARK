package com.javaweb.service.impl;

import java.math.BigDecimal;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.javaweb.entity.BudgetEntity;
import com.javaweb.model.BudgetResponseDTO;
import com.javaweb.repository.BudgetRepository;
import com.javaweb.repository.CategoryRepository;
import com.javaweb.service.BudgetService;

@Service
public class BudgetServiceImpl implements BudgetService {

    @Autowired
    private BudgetRepository budgetRepository;
    
    @Autowired
    private CategoryRepository categoryRepository;

    @Override
    @Transactional(readOnly = true)
    public List<BudgetResponseDTO> getBudgetsByUserId(Long userId) {
        List<BudgetEntity> budgetEntities = budgetRepository.findByUserBudget_Id(userId);
        
        return budgetEntities.stream()
            .map(this::convertToDTO)
            .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public BudgetResponseDTO getBudgetById(Long budgetId) {
        BudgetEntity budgetEntity = budgetRepository.findById(budgetId)
            .orElseThrow(() -> new RuntimeException("Budget not found with id: " + budgetId));
            
        return convertToDTO(budgetEntity);
    }
    
    private BudgetResponseDTO convertToDTO(BudgetEntity budget) {
        
        BudgetResponseDTO dto = new BudgetResponseDTO();
        dto.setCategory(budget.getCategoryBudget().getName());
        dto.setAmountLimit(budget.getAmountLimit());
        dto.setStartDay(budget.getStartDate());
        dto.setEndDay(budget.getEndDate());
       
        
        BigDecimal totalExpenses = budgetRepository
            .calculateTotalExpensesForCategory(budget.getCategoryBudget().getId())
            .orElse(BigDecimal.ZERO);
        dto.setAmountCurrent(totalExpenses);
        
      
        return dto;
    }
}