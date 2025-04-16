package com.javaweb.service.impl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.javaweb.converter.CategoryConverter;
import com.javaweb.entity.CategoryEntity;
import com.javaweb.entity.UserEntity;
import com.javaweb.model.request.CategoryRequestDTO;
import com.javaweb.model.response.CategoryResponseDTO;
import com.javaweb.repository.CategoryRepository;
import com.javaweb.repository.UserRepository;
import com.javaweb.service.CategoryService;

@Service
public class CategoryServiceImpl implements CategoryService {
	
	@Autowired
	CategoryRepository categoryRepository;
	
	@Autowired
	UserRepository userRepository;
	
	@Autowired
	CategoryConverter categoryConverter;
	
	@Override
	public List<CategoryResponseDTO> getAllCategories() {
		// Lấy list entity
		List<CategoryEntity> entities = categoryRepository.findAll();
		
		// chuyển đỏi entity -> response
		List<CategoryResponseDTO> response = categoryConverter.convertToResponseList(entities);
		
		return response;
	}
	
	@Override
	public List<CategoryResponseDTO> getCategoriesByUserId(Long userId) {
		// Get list of categories by userId
		List<CategoryEntity> entities = categoryRepository.findByUserCategoryId(userId);
		
		// Convert entities to response DTOs
		List<CategoryResponseDTO> response = categoryConverter.convertToResponseList(entities);
		
		return response;
	}
	
	@Override
	public CategoryResponseDTO getCategoryById(Long id) {
		Optional<CategoryEntity> categoryOpt = categoryRepository.findById(id);
		if (categoryOpt.isPresent()) {
			return categoryConverter.convertToResponse(categoryOpt.get());
		}
		return null;
	}
	
	@Override
	public CategoryResponseDTO createCategory(CategoryRequestDTO categoryRequest) {
		// Find user by id
		Optional<UserEntity> userOpt = userRepository.findById(categoryRequest.getUserId());
		if (!userOpt.isPresent()) {
			throw new RuntimeException("User not found with ID: " + categoryRequest.getUserId());
		}
		
		// Convert request to entity
		CategoryEntity categoryEntity = categoryConverter.convertToEntity(categoryRequest, userOpt.get());
		
		// Save entity
		CategoryEntity savedEntity = categoryRepository.save(categoryEntity);
		
		// Convert saved entity to response
		return categoryConverter.convertToResponse(savedEntity);
	}
	
	@Override
	public CategoryResponseDTO updateCategory(Long id, CategoryRequestDTO categoryRequest) {
		Optional<CategoryEntity> categoryOpt = categoryRepository.findById(id);
		if (!categoryOpt.isPresent()) {
			return null;
		}
		
		CategoryEntity categoryEntity = categoryOpt.get();
		categoryConverter.updateEntityFromRequest(categoryEntity, categoryRequest);
		
		// Save updated entity
		CategoryEntity updatedEntity = categoryRepository.save(categoryEntity);
		
		// Convert to response
		return categoryConverter.convertToResponse(updatedEntity);
	}
	
	@Override
	public boolean deleteCategory(Long id) {
		Optional<CategoryEntity> categoryOpt = categoryRepository.findById(id);
		if (!categoryOpt.isPresent()) {
			return false;
		}
		
		categoryRepository.deleteById(id);
		return true;
	}
}