package com.javaweb.service.impl;
import java.math.RoundingMode;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.javaweb.Builder.BudgetSearchBuilder;
import com.javaweb.converter.BudgetConverter;
import com.javaweb.entity.BudgetEntity;
import com.javaweb.model.request.BudgetRequestDTO;
import com.javaweb.model.response.BudgetResponseDTO;
import com.javaweb.repository.BudgetRepository;
import com.javaweb.service.BudgetService;

@Service
public class BudgetServiceImpl implements BudgetService {

	@Autowired
	BudgetConverter budgetConverter;
	
	@Autowired
	BudgetRepository budgetRepository;
	
	@Override
	public List<BudgetResponseDTO> getAllBudgets(Map<String, Object> params) {
		//Chuyển đổi dữ liệu từ map qua Builder
		BudgetSearchBuilder builder = budgetConverter.toBudgetSearchBuilder(params);
		//Lấy dữ liệu từ repository
		List<BudgetResponseDTO> result = budgetRepository.getAllBudgets(builder);
		//Cập nhật tỉ lệ alert_threshold
		List<BudgetEntity> updatedEntities = result.stream()
		        .map(item -> {
		            item.setAlertThreshold(item.getUsedAmount().divide(item.getAmountLimit(), 2, RoundingMode.HALF_UP).floatValue());
		            return budgetConverter.convertToEntity(item);
		        })
		        .collect(Collectors.toList());
		//Cập nhật vào database
		budgetRepository.saveAll(updatedEntities);
		return result;
	}

	@Override
	public BudgetResponseDTO  updatedBudget(BudgetRequestDTO request) {
		
		return null;
	}

	@Override
	public BudgetResponseDTO createNewBudget(BudgetRequestDTO request) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void deleteBudgetById(Long id) {
		// TODO Auto-generated method stub
		
	}
}