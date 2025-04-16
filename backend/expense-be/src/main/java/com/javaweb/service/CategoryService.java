package com.javaweb.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.javaweb.model.request.CategoryRequestDTO;
import com.javaweb.model.response.CategoryResponseDTO;

@Service
public interface CategoryService {
	List<CategoryResponseDTO> getAllCategories();
	List<CategoryResponseDTO> getCategoriesByUserId(Long userId);
	CategoryResponseDTO getCategoryById(Long id);
	CategoryResponseDTO createCategory(CategoryRequestDTO categoryRequest);
	CategoryResponseDTO updateCategory(Long id, CategoryRequestDTO categoryRequest);
	boolean deleteCategory(Long id);
}