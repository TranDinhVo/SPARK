package com.javaweb.service;
import java.util.List;
import java.util.Map;

import com.javaweb.model.request.BudgetRequestDTO;
import com.javaweb.model.response.BudgetResponseDTO;


public interface BudgetService {
	List<BudgetResponseDTO> getAllBudgets(Map<String,Object> params);
	BudgetResponseDTO updatedBudget(BudgetRequestDTO request);
	BudgetResponseDTO createNewBudget(BudgetRequestDTO request);
	void deleteBudgetById(Long id);
	BudgetResponseDTO getById(Long id);
	List<BudgetResponseDTO> getByUserId(Long id);
}