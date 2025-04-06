package com.javaweb.repository;

import com.javaweb.entity.BudgetEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface BudgetRepository extends JpaRepository<BudgetEntity, Long> {

    // Tìm danh sách Budget theo userId
    List<BudgetEntity> findByUserBudgetId(Long userId);

    // Tìm Budget theo id và userId
    Optional<BudgetEntity> findByIdAndUserBudgetId(Long id, Long userId);

    // Tìm danh sách Budget theo categoryId
    List<BudgetEntity> findByCategoryBudgetId(Long categoryId);

    // Tìm Budget theo userId và categoryId
    Optional<BudgetEntity> findByUserBudgetIdAndCategoryBudgetId(Long userId, Long categoryId);
}