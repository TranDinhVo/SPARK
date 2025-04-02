package com.javaweb.repository;

import com.javaweb.entity.TransactionEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.util.List;

@Repository
public interface TransactionRepository extends JpaRepository<TransactionEntity, Long> {
    
    List<TransactionEntity> findByUserTransactionId(Long userId);
    
    @Query("SELECT SUM(t.amount) FROM TransactionEntity t WHERE t.categoryTransaction.id = :categoryId AND t.type = 'EXPENSE'")
    BigDecimal getTotalSpentByCategory(@Param("categoryId") Long categoryId);
}