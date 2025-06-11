package com.javaweb.repository.custom.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.javaweb.converter.CategoryConverter;
import com.javaweb.entity.CategoryEntity;
import com.javaweb.repository.custom.CategoryRepositoryCustom;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.Query;

@Repository
public class CategoryRepositoryCustomImpl implements CategoryRepositoryCustom{
	@PersistenceContext
    private EntityManager entityManager;
	@Autowired
	private CategoryConverter categoryConverter;
	@Override
	public CategoryEntity findByKey(String key, Long userId) {
		StringBuilder sql = new StringBuilder("SELECT c.* FROM category AS c ");
		StringBuilder where = new StringBuilder("WHERE c.`name`='");
		where.append(key).append("' AND c.user_id=").append(userId).append(";");
		sql.append(where);
		Query query = entityManager.createNativeQuery(sql.toString(), CategoryEntity.class);
		List<CategoryEntity> results = query.getResultList();
		if (results.isEmpty()) {
	        return null;
	    }
	    CategoryEntity entity = results.get(0);
	    // Giả sử bạn có một hàm để convert từ entity sang DTO:
	    return entity;
	}
	
}
