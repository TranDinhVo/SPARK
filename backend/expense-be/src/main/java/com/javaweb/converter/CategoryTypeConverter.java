package com.javaweb.converter;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.javaweb.entity.CategoryTypeEntity;
import com.javaweb.model.response.CategoryTypeResponseDTO;

@Component
public class CategoryTypeConverter {
	@Autowired
	private ModelMapper modelMapper;
	
	public CategoryTypeResponseDTO convetToResponse(CategoryTypeEntity entity){
		//Dùng model mapper map thành response
		CategoryTypeResponseDTO response = modelMapper.map(entity, CategoryTypeResponseDTO.class);
		return response;
	}
	
	public List<CategoryTypeResponseDTO> convetToResponseList(List<CategoryTypeEntity> entities){
		return entities.stream()
				.map(entity -> convetToResponse(entity))
				.collect(Collectors.toList());
	}
}
