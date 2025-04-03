package com.javaweb.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.javaweb.converter.CategoryTypeConverter;
import com.javaweb.entity.CategoryTypeEntity;
import com.javaweb.model.response.CategoryTypeResponseDTO;
import com.javaweb.repository.CategoryTypeRepository;
import com.javaweb.service.CategoryTypeService;

@Service
public class CategoryTypeServiceImpl implements CategoryTypeService{
	
	@Autowired
	CategoryTypeRepository categoryTypeRepository;
	
	@Autowired
	CategoryTypeConverter categoryTypeConverter;
	
	@Override
	public List<CategoryTypeResponseDTO> getAllCategoryTypes() {
		//Lấy ra tất cả entity
		List<CategoryTypeEntity> entities = categoryTypeRepository.findAll();
		
		//Modal mapper từ entity -> response
		List<CategoryTypeResponseDTO> result = categoryTypeConverter.convetToResponseList(entities);
		return result;
	}
	
}
