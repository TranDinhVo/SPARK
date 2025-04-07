package com.javaweb.converter;

import java.math.BigDecimal;
import java.sql.Timestamp;
import java.time.Instant;
import java.util.Map;

import org.modelmapper.Conditions;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.javaweb.Builder.GoalSearchBuilder;
import com.javaweb.Utils.MapUtil;
import com.javaweb.entity.GoalEntity;
import com.javaweb.model.request.GoalRequestDTO;
import com.javaweb.model.response.GoalResponseDTO;

@Component
public class GoalConverter {
	@Autowired
	private ModelMapper modelMapper;
	
	public GoalSearchBuilder toGoalSearchBuilder(Map<String,Object>params) {
		GoalSearchBuilder builder = new GoalSearchBuilder.Builder()
			.setId(MapUtil.getObject(params, "id", Long.class))
			.setUser_id(MapUtil.getObject(params, "userId", Long.class))
			.setGoal_name(MapUtil.getObject(params, "goalName", String.class))
			.setAmount_from(MapUtil.getObject(params, "amountFrom", BigDecimal.class))
			.setAmount_to(MapUtil.getObject(params, "amountTo", BigDecimal.class))
			.setStart_at(MapUtil.getObject(params, "startAt", Instant.class))
			.setEnd_at(MapUtil.getObject(params, "endAt", Instant.class))
			.build();
		
		return builder;
	}
	
	public GoalResponseDTO mapToGoalResponseDTO(Object[]row) {
		Long id = (row.length > 0 && row[0] != null) ? ((Number) row[0]).longValue() : null;
		Long userId = (row.length > 1 && row[1] != null) ? ((Number) row[1]).longValue() : null;
		String nameGoal = (row.length > 2 && row[2] != null) ? (String) row[2] : "";
		BigDecimal targetAmount = (row.length > 3 && row[3] != null) ? ((BigDecimal) row[3]) : BigDecimal.ZERO;
		Instant deadline = (row.length > 4 && row[4] != null) ? ((Timestamp) row[4]).toInstant() : null;
		String status = (row.length > 5 && row[5] != null) ? (String) row[5] : "";
		Instant createAt = (row.length > 6 && row[6] != null) ? ((Timestamp) row[6]).toInstant() : null;
		 BigDecimal currentAmount = (row.length > 7 && row[7] != null) ? (BigDecimal) row[7] : BigDecimal.ZERO;  
	    return new GoalResponseDTO(id, userId, nameGoal, targetAmount, deadline, status, createAt, currentAmount);
	}
	public GoalEntity convertToEntity(GoalResponseDTO response) {
		modelMapper.getConfiguration().setPropertyCondition(Conditions.isNotNull());
		GoalEntity entity = new GoalEntity();
		modelMapper.map(response, entity);
		return entity;
	}
	
	public GoalEntity mapToEntity(GoalRequestDTO request, GoalEntity entity) {
		modelMapper.getConfiguration().setPropertyCondition(Conditions.isNotNull());
		modelMapper.map(request, entity);
		return entity;
	}
	
	public GoalResponseDTO convertToResponse(GoalEntity entity) {
		GoalResponseDTO response = new GoalResponseDTO();
		modelMapper.map(entity,response);
		return response;
	}
}
