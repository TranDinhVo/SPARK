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
		Long categoryId = (row.length > 2 && row[2] != null) ? ((Number) row[2]).longValue() : null;
		BigDecimal amountLimit = (row.length > 3 && row[3] != null) ? (BigDecimal) row[3] : BigDecimal.ZERO; 
//		LocalDate startDate = (row.length > 4 && row[4] != null) ? new Timestamp(((Date) row[4]).getTime()).toInstant(): null;
//		LocalDate endDate = (row.length > 5 && row[5] != null) ? new Timestamp(((Date) row[5]).getTime()).toInstant(): null;
		LocalDate startDate = null;
	    if (row.length > 4 && row[4] != null) {
	        Date date = (Date) row[4];
	        startDate = date.toInstant().atZone(ZoneId.systemDefault()).toLocalDate();
	    }

	    LocalDate endDate = null;
	    if (row.length > 5 && row[5] != null) {
	        Date date = (Date) row[5];
	        endDate = date.toInstant().atZone(ZoneId.systemDefault()).toLocalDate();
	    }
		Float alertThreshold = (row.length > 6 && row[6] != null) ? ((Float) row[6]).floatValue() : null;
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
		return entity;
	}
	public BudgetResponseDTO convertToResponse(BudgetEntity entity) {
		BudgetResponseDTO response = new BudgetResponseDTO();
		modelMapper.map(entity,response);
		response.setBudgetName(entity.getCategoryBudget().getName());
		return response;
	}
}
