package com.javaweb.repository;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.javaweb.entity.RecurringTransactionEntity;
import com.javaweb.repository.custom.RecurringTransactionRepositoryCustom;
@Repository
public interface RecurringTransactionRepository extends JpaRepository<RecurringTransactionEntity, Long>, RecurringTransactionRepositoryCustom {
	List<RecurringTransactionEntity>findByUserId(Long userId);
}