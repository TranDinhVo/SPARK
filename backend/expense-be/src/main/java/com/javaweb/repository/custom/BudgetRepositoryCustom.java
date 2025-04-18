package com.javaweb.repository.custom;
import java.time.LocalDate;
import java.util.List;
import com.javaweb.Builder.BudgetSearchBuilder;
import com.javaweb.model.response.BudgetResponseDTO;

public interface BudgetRepositoryCustom {
    List<BudgetResponseDTO> getAllBudgets(BudgetSearchBuilder builder);
    void getUsedAmount(BudgetResponseDTO entity);
    
    // Phương thức mới
    List<BudgetResponseDTO> getBudgetsByDateRange(LocalDate fromDate, LocalDate toDate, Long userId);
}