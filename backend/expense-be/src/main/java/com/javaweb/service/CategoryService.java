package com.javaweb.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.javaweb.model.response.CategoryResponseDTO;

@Service
public interface CategoryService {
	List<CategoryResponseDTO> getAllCategories();
}
