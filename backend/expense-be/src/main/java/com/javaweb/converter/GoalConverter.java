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
import com.javaweb.enums.GoalStatusEnum;
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
	
	public GoalResponseDTO mapToGoalResponseDTO(Object[] row) {
	    try {
	        Long id = (row[0] != null) ? ((Number) row[0]).longValue() : null;
	        Long userId = (row[1] != null) ? ((Number) row[1]).longValue() : null;
	        BigDecimal targetAmount = (row[2] != null) ? ((BigDecimal) row[2]) : BigDecimal.ZERO;
	        Instant createAt = (row[3] != null) ? ((Timestamp) row[3]).toInstant() : null;
	        Instant deadline = (row[4] != null) ? ((Timestamp) row[4]).toInstant() : null;
	        String nameGoal = (row[5] != null) ? (String) row[5] : "";
	        String status = (row[6] != null) ? (String) row[6] : "";
	        BigDecimal currentAmount = (row[7] != null) ? (BigDecimal) row[7] : BigDecimal.ZERO;
	        String iconUrl = (row.length > 8 && row[8] != null) ? (String) row[8] : null;
	        
	        // In ra log để kiểm tra giá trị
	        System.out.println("Row data: id=" + id + ", name=" + nameGoal + ", amount=" + targetAmount);
	        
	        // Tạo DTO
	        GoalResponseDTO dto = new GoalResponseDTO();
	        dto.setId(id);
	        dto.setGoalName(nameGoal);
	        dto.setTargetAmount(targetAmount);
	        dto.setDeadline(deadline);
	        dto.setStatus(status != null && !status.isEmpty() ? GoalStatusEnum.valueOf(status) : GoalStatusEnum.DANG_THUC_HIEN);
	        dto.setCreatedAt(createAt);
	        dto.setCurrentAmount(currentAmount);
	        dto.setIconUrl(iconUrl);
	        
	        return dto;
	    } catch (Exception e) {
	        System.err.println("Error mapping row to DTO: " + e.getMessage());
	        e.printStackTrace();
	        return null;
	    }
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
		modelMapper.map(entity, response);
		// Manually map iconUrl if the entity has a category
		if (entity.getCategory() != null) {
			response.setIconUrl(entity.getCategory().getIconUrl());
		}
		return response;
	}
	
	public GoalEntity convertToEntity(GoalResponseDTO response, GoalEntity entity) {
		modelMapper.getConfiguration().setPropertyCondition(Conditions.isNotNull());
		modelMapper.map(response, entity);
		return entity;
	}
}