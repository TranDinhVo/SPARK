package com.javaweb.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.javaweb.model.request.GoalRequestDTO;
import com.javaweb.model.response.GoalResponseDTO;
import com.javaweb.service.GoalService;

@RestController
@RequestMapping("/api/goal")
public class GoalsAPI {
	@Autowired
	GoalService goalService;
	
	@GetMapping
	public List<GoalResponseDTO> getAllGoals(@RequestParam Map<String,Object> params){
		return goalService.getAllGoal(params);
	}
	
	@GetMapping("/{id}")
	public GoalResponseDTO getGoal(@PathVariable Long id) {
		return goalService.getGoal(id);
	}
	
	@GetMapping("/user/{userId}")
	public List<GoalResponseDTO> getByUserId(@PathVariable Long userId){
		return goalService.getByUserId(userId);
	}
	
	@PatchMapping("/{id}")
	public GoalResponseDTO updateGoal(
			@PathVariable Long id,
			@RequestBody GoalRequestDTO request){
		request.setId(id);
		return goalService.updateGoal(request);
	}
	
	@PostMapping
	public GoalResponseDTO createNewGoal(@RequestBody GoalRequestDTO request){
		return goalService.createNewGoal(request);
	}
	
	@DeleteMapping("/{id}")
	public void deleteById(@PathVariable Long id) {
		goalService.deleteById(id);
	}
}
