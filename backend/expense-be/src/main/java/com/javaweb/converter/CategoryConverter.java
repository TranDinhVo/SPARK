package com.javaweb.converter;

import java.util.List;
import java.util.stream.Collector;
import java.util.stream.Collectors;

import org.modelmapper.Conditions;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.javaweb.entity.CategoryEntity;
import com.javaweb.model.response.CategoryResponseDTO;

@Component
public class CategoryConverter {
	
	@Autowired
	private ModelMapper modelMapper;
	
	public CategoryResponseDTO convertToEntity(CategoryEntity entity) {
		//mapper từ entity -> response
		modelMapper.getConfiguration().setSkipNullEnabled(true);
		CategoryResponseDTO response = modelMapper.map(entity, CategoryResponseDTO.class);
		return response;
	}
	
	public List<CategoryResponseDTO> convertToEntityList(List<CategoryEntity> entities) {
		//return đồng thời add từng entity -> list
		List<CategoryResponseDTO> result =entities.stream()
				.map(entity -> convertToEntity(entity))
				.collect(Collectors.toList()); 
		return result;
	}
}
