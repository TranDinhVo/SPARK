package com.javaweb.repository.custom;

import com.javaweb.entity.CategoryEntity;

public interface CategoryRepositoryCustom {
	CategoryEntity findByKey(String key, Long userId);
}
