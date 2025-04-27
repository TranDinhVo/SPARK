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
import com.javaweb.entity.GoalEntity;
import com.javaweb.model.request.GoalRequestDTO;
import com.javaweb.model.response.BudgetResponseDTO;
import com.javaweb.model.response.GoalResponseDTO;
import com.javaweb.repository.GoalRepository;
import com.javaweb.service.GoalService;

import jakarta.persistence.EntityNotFoundException;

@Service
public class GoalServiceImpl implements GoalService{
	@Autowired
	GoalRepository goalRepository;
	
	
	@Autowired
	GoalConverter goalConverter; 
	
	@Override
	public List<GoalResponseDTO> getAllGoal(Map<String, Object> params) {
		//Chuyển đổi dữ liệu qua GoalSearchBuilder
		GoalSearchBuilder builder = goalConverter.toGoalSearchBuilder(params);
		//Lấy dữ liệu từ repository
		List<GoalResponseDTO> result = goalRepository.getAllGoals(builder);
		List<GoalEntity> updatedEntities = result.stream()
		        .map(item -> {
		        	GoalEntity updateEntity = goalRepository.findById(item.getId()).get();
		            GoalResponseDTO updatedItem = goalRepository.updateStatus(item); // Cập nhật status
		            updateEntity = goalConverter.convertToEntity(updatedItem,updateEntity);
		            return updateEntity;
		        })
		        .collect(Collectors.toList());

		    // Lưu tất cả entity đã cập nhật
		    goalRepository.saveAll(updatedEntities); // Sử dụng saveAll thay vì save từng entity
		return result;
	}

	@Override
	public GoalResponseDTO updateGoal(GoalRequestDTO request) {
		//Lấy giá trị entity từ database
		GoalEntity entity = goalRepository.findById(request.getId()).get();
		
		//Cập nhật dữ liệu từ request về entity
		entity = goalConverter.mapToEntity(request,entity);
		
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
