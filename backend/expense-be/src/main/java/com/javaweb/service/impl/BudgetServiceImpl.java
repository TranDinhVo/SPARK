package com.javaweb.service.impl;
import java.math.BigDecimal;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.javaweb.Builder.BudgetSearchBuilder;
import com.javaweb.converter.BudgetConverter;
import com.javaweb.entity.BudgetEntity;
import com.javaweb.entity.CategoryEntity;
import com.javaweb.model.request.BudgetRequestDTO;
import com.javaweb.model.response.BudgetResponseDTO;
import com.javaweb.repository.BudgetRepository;
import com.javaweb.repository.CategoryRepository;
import com.javaweb.service.BudgetService;

import jakarta.persistence.EntityNotFoundException;

@Service
public class BudgetServiceImpl implements BudgetService {

	@Autowired
	CategoryRepository categoryRepository;
	
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
		            return budgetConverter.convertToEntity(item);
		        })
		        .collect(Collectors.toList());
		return result;
	}

	@Override
	public BudgetResponseDTO updatedBudget(BudgetRequestDTO request) {
		BudgetEntity entity = budgetRepository.findById(request.getId()).get();
		//Cập nhật dữ liệu từ request về entity
		entity = budgetConverter.mapToEntity(request);
		//Chuyển dữ liệu qua response
		BudgetResponseDTO response = budgetConverter.convertToResponse(entity);
		//Cập nhật entity ở database
		budgetRepository.save(budgetConverter.convertToEntity(response));
		return response;
	}

	@Override
	public BudgetResponseDTO createNewBudget(BudgetRequestDTO request) {
		//Thỏa điều kiện không null
		request.validate();
				
		//Chuyển request sang entity
		BudgetEntity entity = budgetConverter.mapToEntity(request);
		CategoryEntity category = categoryRepository.findById(request.getCategoryId())
			 .orElseThrow(() -> new RuntimeException("Category không tồn tại với ID: " + request.getCategoryId()));
		entity.setCategoryBudget(category);
		//Lưu vào database
		budgetRepository.save(entity);
				
		//Chuyển đầu ra response
		BudgetResponseDTO response =  budgetConverter.convertToResponse(entity);
		response.setUsedAmount(BigDecimal.ZERO);
		return response;
	}

	@Override
	public void deleteBudgetById(Long id) {
		if (!budgetRepository.existsById(id)) {
	        throw new EntityNotFoundException("Không tìm thấy khoản tiết kiệm với ID: " + id);
	    }
	    budgetRepository.deleteById(id);
	}

	@Override
	public BudgetResponseDTO getById(Long id) {
		BudgetEntity entity = budgetRepository.findById(id).get();
		return budgetConverter.convertToResponse(entity);
	}

	@Override
	public List<BudgetResponseDTO> getByUserId(Long userId) {
		 // BudgetSearchBuilder builder = new BudgetSearchBuilder.Builder().setUser_id(userId).build();
		List<BudgetResponseDTO> response =  budgetRepository.findByUserId(id);           // budgetRepository.getAllBudgets(builder);
		return response;
	}
}