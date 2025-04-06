package com.javaweb.controller;

import com.javaweb.model.dto.BudgetDTO;
import com.javaweb.model.request.BudgetRequest;
import com.javaweb.service.BudgetService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/budgets")
public class BudgetController {

    @Autowired
    private BudgetService budgetService;

    @GetMapping
    public ResponseEntity<List<BudgetDTO>> getAllBudgets(@RequestParam Long userId) {
        List<BudgetDTO> budgets = budgetService.getAllBudgets(userId);
        return ResponseEntity.ok(budgets);
    }

    @GetMapping("/{id}")
    public ResponseEntity<BudgetDTO> getBudgetById(
            @PathVariable Long id,
            @RequestParam Long userId) {
        BudgetDTO budget = budgetService.getBudgetById(userId, id);
        return ResponseEntity.ok(budget);
    }

    @PostMapping
    public ResponseEntity<BudgetDTO> createBudget(@RequestBody BudgetRequest budgetRequest) {
        BudgetDTO createdBudget = budgetService.createBudget(budgetRequest);
        return new ResponseEntity<>(createdBudget, HttpStatus.CREATED);
    }

    @PatchMapping("/{id}")
    public ResponseEntity<BudgetDTO> updateBudget(
            @PathVariable Long id,
            @RequestParam Long userId,
            @RequestBody BudgetRequest budgetRequest) {
        BudgetDTO updatedBudget = budgetService.updateBudget(userId, id, budgetRequest);
        return ResponseEntity.ok(updatedBudget);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteBudget(
            @PathVariable Long id,
            @RequestParam Long userId) {
        budgetService.deleteBudget(userId, id);
        return ResponseEntity.noContent().build();
    }
}