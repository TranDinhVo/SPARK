package com.javaweb.repository.custom;

import java.util.List;

import com.javaweb.Builder.BudgetSearchBuilder;
import com.javaweb.model.request.BudgetRequestDTO;
import com.javaweb.model.response.BudgetResponseDTO;

public interface BudgetRepositoryCustom {
	List<BudgetResponseDTO> getAllBudgets(BudgetSearchBuilder builder);
	BudgetResponseDTO updatedBudget(BudgetRequestDTO request);
	BudgetResponseDTO updateRate(BudgetResponseDTO response);
}
