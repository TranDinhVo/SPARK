package com.javaweb.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.javaweb.model.response.CategoryResponseDTO;
import com.javaweb.service.CategoryService;

@RestController
@RequestMapping("/api/categories")
public class CategoryAPI {
	
	@Autowired
	CategoryService categoryService;
	
	@GetMapping
	public List<CategoryResponseDTO> getAllCategories(){
		return categoryService.getAllCategories();
	}
}
