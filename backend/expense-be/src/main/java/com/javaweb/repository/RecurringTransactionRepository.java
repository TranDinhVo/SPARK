package com.javaweb.repository;

import com.javaweb.entity.RecurringTransactionEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RecurringTransactionRepository extends JpaRepository<RecurringTransactionEntity, Long> {
}