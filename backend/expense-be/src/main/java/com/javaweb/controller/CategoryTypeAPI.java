package com.javaweb.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.javaweb.model.response.CategoryTypeResponseDTO;
import com.javaweb.service.CategoryTypeService;

@RestController
@RequestMapping("/api/categorytypes")
public class CategoryTypeAPI {
	@Autowired
	CategoryTypeService categoryTypeService;
	
	@GetMapping
	public List<CategoryTypeResponseDTO> getAllCategoryTypes() {
		return categoryTypeService.getAllCategoryTypes();
	}
	
}
