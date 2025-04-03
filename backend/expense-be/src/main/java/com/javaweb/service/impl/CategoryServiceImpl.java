package com.javaweb.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.javaweb.converter.CategoryConverter;
import com.javaweb.entity.CategoryEntity;
import com.javaweb.model.response.CategoryResponseDTO;
import com.javaweb.repository.CategoryRepository;
import com.javaweb.service.CategoryService;

@Service
public class CategoryServiceImpl implements CategoryService{

	@Autowired
	CategoryRepository categoryRepository;
	
	@Autowired
	CategoryConverter categoryConverter;
	
	@Override
	public List<CategoryResponseDTO> getAllCategories() {
		//Lấy list entity
		List<CategoryEntity> entities = categoryRepository.findAll();
		
		//chuyển đỏi entiy -> response
		List<CategoryResponseDTO> response = categoryConverter.convertToEntityList(entities);
		
		return response;
	}
	
}
