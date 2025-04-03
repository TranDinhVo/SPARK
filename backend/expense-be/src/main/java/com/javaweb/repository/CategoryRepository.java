package com.javaweb.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.javaweb.entity.CategoryEntity;

@Repository
public interface CategoryRepository extends JpaRepository<CategoryEntity, Long> {
    // This method had incorrect naming - should match your entity field name
    Optional<CategoryEntity> findById(Long id); // Changed from findByCategory_Id
}

