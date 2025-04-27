package com.javaweb.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import java.time.LocalDate;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
import java.util.HashMap;
import java.util.Map;

import com.javaweb.model.request.BudgetRequestDTO;
import com.javaweb.model.response.BudgetResponseDTO;
import com.javaweb.service.BudgetService;

@RestController
@RequestMapping("/api/budget")
public class BudgetController {
    
    @Autowired
    private BudgetService budgetService;
    
    @GetMapping
    public List<BudgetResponseDTO> getAllBudgets(@RequestParam Map<String,Object> params) {
        return budgetService.getAllBudgets(params);
    }
    
    @GetMapping("/{id}")
    public BudgetResponseDTO getById(@PathVariable Long id) {
        return budgetService.getById(id);
    }
    
    @GetMapping("/user/{userId}")
    public List<BudgetResponseDTO> getByUserId(@PathVariable Long userId) {
        return budgetService.getByUserId(userId);
    }
    
    @PatchMapping("/{id}")
    public BudgetResponseDTO updatedBudget(
    		@PathVariable Long id,
    		@RequestBody BudgetRequestDTO request) {
    	request.setId(id);
    	return budgetService.updatedBudget(request);
    }
    
    @PostMapping
    public BudgetResponseDTO createNewBudget(@RequestBody BudgetRequestDTO request) {
    	return budgetService.createNewBudget(request);
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, String>> deleteBudgetById(@PathVariable Long id) {
        boolean deleted = budgetService.deleteBudgetById(id);
        Map<String, String> response = new HashMap<>();
        response.put("message", "Đã xóa ngân sách với id: " + id);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
    @GetMapping("/date-range")
    public List<BudgetResponseDTO> getBudgetsByDateRange(
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate fromDate,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate toDate,
            @RequestParam(required = false) Long userId) {
        return budgetService.getBudgetsByDateRange(fromDate, toDate, userId);
    }
}