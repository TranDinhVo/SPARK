package com.javaweb.service;
import java.time.LocalDate;
import java.util.List;
import java.util.Map;
import com.javaweb.model.request.BudgetRequestDTO;
import com.javaweb.model.response.BudgetResponseDTO;

public interface BudgetService {
    List<BudgetResponseDTO> getAllBudgets(Map<String,Object> params);
    BudgetResponseDTO updatedBudget(BudgetRequestDTO request);
    BudgetResponseDTO createNewBudget(BudgetRequestDTO request);
    boolean deleteBudgetById(Long id);
    BudgetResponseDTO getById(Long id);
    List<BudgetResponseDTO> getByUserId(Long id);
    
    // Phương thức mới
    List<BudgetResponseDTO> getBudgetsByDateRange(LocalDate fromDate, LocalDate toDate, Long userId);
}