package com.javaweb.repository.custom;

import java.math.BigDecimal;
import java.util.List;

import com.javaweb.Builder.GoalSearchBuilder;
import com.javaweb.model.response.GoalResponseDTO;

public interface GoalRepositoryCustom {
	List<GoalResponseDTO> getAllGoals(GoalSearchBuilder buider);
	GoalResponseDTO updateStatus(GoalResponseDTO response);
	void getCurrentAmount(GoalResponseDTO response);
}
