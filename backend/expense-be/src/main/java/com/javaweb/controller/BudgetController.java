package com.javaweb.controller;

import com.javaweb.model.BudgetResponseDTO;
import com.javaweb.service.BudgetService;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/budgets")
public class BudgetController {
    
    @Autowired
    private BudgetService budgetService;
    
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<BudgetResponseDTO>> getUserBudgets(@PathVariable Long userId) {
        List<BudgetResponseDTO> budgets = budgetService.getBudgetsByUserId(userId);
        return ResponseEntity.ok(budgets);
    }
    
    @GetMapping("/{budgetId}")
    public ResponseEntity<BudgetResponseDTO> getBudgetById(@PathVariable Long budgetId) {
        BudgetResponseDTO budget = budgetService.getBudgetById(budgetId);
        return ResponseEntity.ok(budget);
    }
}