package com.javaweb.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.javaweb.entity.BudgetEntity;
import com.javaweb.model.response.BudgetResponseDTO;
import com.javaweb.repository.custom.BudgetRepositoryCustom;

public interface BudgetRepository extends JpaRepository<BudgetEntity, Long>,BudgetRepositoryCustom {
	List<BudgetEntity>findByUserBudget_Id(Long userId);
}