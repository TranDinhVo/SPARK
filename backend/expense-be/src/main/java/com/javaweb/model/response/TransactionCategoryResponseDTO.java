package com.javaweb.model.response;

import com.javaweb.enums.CategoryTypeEnum;

public class TransactionCategoryResponseDTO {
	private CategoryTypeEnum type;
	private String name;
	public CategoryTypeEnum getType() {
		return type;
	}
	public void setType(CategoryTypeEnum type) {
		this.type = type;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public TransactionCategoryResponseDTO() {}
	public TransactionCategoryResponseDTO(CategoryTypeEnum type, String name) {
		super();
		this.type = type;
		this.name = name;
	}
	
	
}
