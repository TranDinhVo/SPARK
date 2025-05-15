package com.javaweb.repository;
import com.javaweb.entity.BudgetEntity;
import com.javaweb.entity.RecurringTransactionEntity;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
@Repository
public interface RecurringTransactionRepository extends JpaRepository<RecurringTransactionEntity, Long> {
	List<RecurringTransactionEntity>findByUserId(Long userId);
}