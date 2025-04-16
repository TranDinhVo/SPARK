package com.javaweb.converter;

import java.math.BigDecimal;
import java.sql.Date;
import java.sql.Timestamp;
import java.time.Instant;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.Map;

import org.modelmapper.Conditions;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.javaweb.Builder.BudgetSearchBuilder;
import com.javaweb.Utils.MapUtil;
import com.javaweb.entity.BudgetEntity;
import com.javaweb.entity.CategoryEntity;
import com.javaweb.model.request.BudgetRequestDTO;
import com.javaweb.model.response.BudgetResponseDTO;
import com.javaweb.repository.CategoryRepository;

@Component
public class BudgetConverter {
	
	@Autowired
	private ModelMapper modelMapper;
	@Autowired
	CategoryRepository categoryRepository;
	
	public BudgetSearchBuilder toBudgetSearchBuilder(Map<String, Object> params) {
		BudgetSearchBuilder builder = new BudgetSearchBuilder.Builder()
				.setId(MapUtil.getObject(params, "id", Long.class))
				.setUser_id(MapUtil.getObject(params, "userId", Long.class))
				.setCategory_id(MapUtil.getObject(params, "categoryId", Long.class))
				.setAmount_from(MapUtil.getObject(params,"amountFrom", BigDecimal.class))
				.setAmount_to(MapUtil.getObject(params,"amountTo", BigDecimal.class))
				.setStart_date(MapUtil.getObject(params, "startDate", Instant.class))
				.setEnd_date(MapUtil.getObject(params, "endDate", Instant.class))
				.build();
		return builder;
	}
	public BudgetResponseDTO mapToGoalResponseDTO(Object[] row) {
		Long id = (row.length > 0 && row[0] != null) ? ((Number) row[0]).longValue() : null;
		Long userId = (row.length > 1 && row[1] != null) ? ((Number) row[1]).longValue() : null;
		Float alertThreshold = (row.length > 2 && row[2] != null) ? ((Float) row[2]).floatValue() : null;
		BigDecimal amountLimit = (row.length > 3 && row[3] != null) ? (BigDecimal) row[3] : BigDecimal.ZERO; 
		LocalDate endDate = (row.length > 4 && row[4] != null) ? ((java.sql.Date) row[4]).toLocalDate() : null;
		LocalDate startDate = (row.length > 5 && row[5] != null) ? ((java.sql.Date) row[5]).toLocalDate() : null;
		Long categoryId = (row.length > 6 && row[6] != null) ? ((Number) row[6]).longValue() : null;
		Instant createAt = (row.length > 7 && row[7] != null) ? ((Timestamp) row[7]).toInstant() : null;
		String nameBudget = (row.length > 8 && row[8] != null) ? (String) row[8] : "";
		BigDecimal usedAmount = (row.length > 9 && row[9] != null) ? (BigDecimal) row[9] : BigDecimal.ZERO;  
	    return new BudgetResponseDTO(id, nameBudget, amountLimit, usedAmount, startDate, endDate, alertThreshold,  createAt);
	}
	public BudgetEntity convertToEntity(BudgetResponseDTO response) {
		modelMapper.getConfiguration().setPropertyCondition(Conditions.isNotNull());
		BudgetEntity entity = new BudgetEntity();
		modelMapper.map(response, entity);
	    return entity;
	}
	public BudgetEntity mapToEntity(BudgetRequestDTO request) {
	    modelMapper.getConfiguration().setPropertyCondition(Conditions.isNotNull());
	    BudgetEntity entity = new BudgetEntity();
	    modelMapper.map(request, entity);

	    // Gán categoryBudget từ categoryId
	    if (request.getCategoryId() != null) {
	        CategoryEntity category = categoryRepository.findById(request.getCategoryId())
	            .orElseThrow(() -> new RuntimeException("Không tìm thấy danh mục với id: " + request.getCategoryId()));
	        entity.setCategoryBudget(category);
	    }

	    return entity;
	}


	public BudgetResponseDTO convertToResponse(BudgetEntity entity) {
	    BudgetResponseDTO response = new BudgetResponseDTO();
	    modelMapper.map(entity, response);

	    // Check null trước khi lấy tên category
	    if (entity.getCategoryBudget() != null) {
	        response.setBudgetName(entity.getCategoryBudget().getName());
	    } else {
	        response.setBudgetName("Không xác định"); // Hoặc null tùy bạn
	    }

	    return response;
	}

}
