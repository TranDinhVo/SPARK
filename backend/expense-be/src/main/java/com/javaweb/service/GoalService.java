package com.javaweb.service;

import java.util.List;
import java.util.Map;

import com.javaweb.model.request.GoalRequestDTO;
import com.javaweb.model.response.GoalResponseDTO;

public interface GoalService {
	List<GoalResponseDTO> getAllGoal(Map<String,Object> params);
	GoalResponseDTO updateGoal(GoalRequestDTO request);
	GoalResponseDTO createNewGoal(GoalRequestDTO request);
	void deleteById(Long id);
	GoalResponseDTO getGoal(Long id);
	List<GoalResponseDTO> getByUserId(Long userId);
}
