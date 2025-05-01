package com.javaweb.service.impl;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.javaweb.Builder.GoalSearchBuilder;
import com.javaweb.converter.GoalConverter;
import com.javaweb.entity.BudgetEntity;
import com.javaweb.entity.CategoryEntity;
import com.javaweb.entity.GoalEntity;
import com.javaweb.entity.UserEntity;
import com.javaweb.model.request.GoalRequestDTO;
import com.javaweb.model.response.BudgetResponseDTO;
import com.javaweb.model.response.GoalResponseDTO;
import com.javaweb.repository.CategoryRepository;
import com.javaweb.repository.GoalRepository;
import com.javaweb.repository.UserRepository;
import com.javaweb.service.GoalService;

import jakarta.persistence.EntityNotFoundException;

@Service
public class GoalServiceImpl implements GoalService{
	@Autowired
	GoalRepository goalRepository;
	
	@Autowired
	CategoryRepository categoryRepository;
	
	@Autowired
	UserRepository userRepository;
	
	@Autowired
	GoalConverter goalConverter; 
	
	@Override
	public List<GoalResponseDTO> getAllGoal(Map<String, Object> params) {
	    // Log params để kiểm tra
	    System.out.println("Params: " + params);
	    
	    // Chuyển đổi dữ liệu qua GoalSearchBuilder
	    GoalSearchBuilder builder = goalConverter.toGoalSearchBuilder(params);
	    
	    // Lấy dữ liệu từ repository
	    List<GoalResponseDTO> result = goalRepository.getAllGoals(builder);
	    
	    // Log kết quả để kiểm tra
	    System.out.println("Result size: " + (result != null ? result.size() : "null"));
	    if (result != null && !result.isEmpty()) {
	        System.out.println("First item: " + result.get(0).getGoalName());
	    } else {
	        System.out.println("No results found");
	    }
	    
	    return result;
	}

	@Override
	public GoalResponseDTO updateGoal(GoalRequestDTO request) {
		//Lấy giá trị entity từ database
		GoalEntity entity = goalRepository.findById(request.getId()).get();
		
		//Cập nhật dữ liệu từ request về entity
		entity = goalConverter.mapToEntity(request, entity);
		
		// Instead of setting category, directly set iconUrl if it's provided
		if (request.getIconUrl() != null) {
			entity.setIconUrl(request.getIconUrl());
		}
		
		// You can still fetch and use category data for other purposes if needed
		if (request.getCategoryId() != null) {
			// This can be used for future logic if category is still needed for something else
			CategoryEntity category = categoryRepository.findById(request.getCategoryId())
				.orElseThrow(() -> new EntityNotFoundException("Không tìm thấy danh mục với ID: " + request.getCategoryId()));
			
			// You might want to set a default icon from category if none was provided
			if (request.getIconUrl() == null && entity.getIconUrl() == null) {
				entity.setIconUrl(category.getIconUrl());
			}
		}
		
		//Chuyển dữ liệu qua response
		GoalResponseDTO response = goalConverter.convertToResponse(entity);
		
		//Cập nhật status của response
		response = goalRepository.updateStatus(response);
		goalRepository.getCurrentAmount(response);
		entity.setStatus(response.getStatus());
		//Cập nhật entity ở database
		goalRepository.save(entity);
		
		return response;
	}

	@Override
	public GoalResponseDTO createNewGoal(GoalRequestDTO request) {
		//Thỏa điều kiện không null
		request.validate();
		
		//Chuyển request sang entity
		GoalEntity entity = goalConverter.mapToEntity(request, new GoalEntity());
		
		// Set user
		UserEntity user = userRepository.findById(request.getUserId())
			.orElseThrow(() -> new EntityNotFoundException("Không tìm thấy người dùng với ID: " + request.getUserId()));
		entity.setUserGoal(user);
		
		// Directly set iconUrl from request
		if (request.getIconUrl() != null) {
			entity.setIconUrl(request.getIconUrl());
		}
		
		// Optional: You can still use category for getting icon if none provided
		if (entity.getIconUrl() == null && request.getCategoryId() != null) {
			CategoryEntity category = categoryRepository.findById(request.getCategoryId())
				.orElseThrow(() -> new EntityNotFoundException("Không tìm thấy danh mục với ID: " + request.getCategoryId()));
			entity.setIconUrl(category.getIconUrl());
		}
		
		//Lưu vào database
		goalRepository.save(entity);
		
		//Chuyển đầu ra response
		GoalResponseDTO response = goalConverter.convertToResponse(entity);
		response.setCurrentAmount(BigDecimal.ZERO);
		return response;
	}

	@Override
	public boolean deleteById(Long id) {
		if (!goalRepository.existsById(id)) {
	        throw new EntityNotFoundException("Không tìm thấy khoản tiết kiệm với ID: " + id);
	    }
	    goalRepository.deleteById(id);
		return false;
	}

	@Override
	public GoalResponseDTO getGoal(Long id) {
		if (!goalRepository.existsById(id)) {
	        throw new EntityNotFoundException("Không tìm thấy mục tiêu tiết kiệm với ID: " + id);
	    }
		GoalResponseDTO response = goalConverter.convertToResponse(goalRepository.findById(id).get());
		goalRepository.getCurrentAmount(response);
		goalRepository.updateStatus(response);
		return response;
	}

	@Override
	public List<GoalResponseDTO> getByUserId(Long userId) {
		List<GoalEntity> entities =  goalRepository.findByUserGoal_Id(userId);
		List<GoalResponseDTO> responseList = entities.stream().map(entity -> {
			GoalResponseDTO response = goalConverter.convertToResponse(entity);
			goalRepository.getCurrentAmount(response);
			goalRepository.updateStatus(response);
			return response;
		}).collect(Collectors.toList());
		return responseList;
	}
}