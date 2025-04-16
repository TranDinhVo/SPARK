package com.javaweb.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.javaweb.model.request.CategoryRequestDTO;
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
	
	@GetMapping("/user/{userId}")
	public List<CategoryResponseDTO> getCategoriesByUserId(@PathVariable Long userId) {
		return categoryService.getCategoriesByUserId(userId);
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<CategoryResponseDTO> getCategoryById(@PathVariable Long id) {
		CategoryResponseDTO category = categoryService.getCategoryById(id);
		if (category != null) {
			return ResponseEntity.ok(category);
		}
		return ResponseEntity.notFound().build();
	}
	
	@PostMapping
	public ResponseEntity<CategoryResponseDTO> createCategory(@RequestBody CategoryRequestDTO categoryRequest) {
		CategoryResponseDTO created = categoryService.createCategory(categoryRequest);
		return new ResponseEntity<>(created, HttpStatus.CREATED);
	}
	
	@PatchMapping("/{id}")
	public ResponseEntity<CategoryResponseDTO> updateCategory(
			@PathVariable Long id, 
			@RequestBody CategoryRequestDTO categoryRequest) {
		CategoryResponseDTO updated = categoryService.updateCategory(id, categoryRequest);
		if (updated != null) {
			return ResponseEntity.ok(updated);
		}
		return ResponseEntity.notFound().build();
	}
	
	@DeleteMapping("/{id}")
	public ResponseEntity<Void> deleteCategory(@PathVariable Long id) {
		boolean deleted = categoryService.deleteCategory(id);
		if (deleted) {
			return ResponseEntity.noContent().build();
		}
		return ResponseEntity.notFound().build();
	}
}