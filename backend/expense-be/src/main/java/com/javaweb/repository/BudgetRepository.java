package com.javaweb.repository;

import com.javaweb.entity.BudgetEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

@Repository
public interface BudgetRepository extends JpaRepository<BudgetEntity, Long> {
//    List<BudgetEntity> findByUserBudget_Id(Long userId);
//    
//    @Query("SELECT SUM(t.amount) FROM TransactionEntity t " +
//    	       "WHERE t.categoryTransaction.id = :categoryId " +
//    	       "AND t.categoryTransaction.categoryType.name = 'EXPENSE'")
//    	Optional<BigDecimal> calculateTotalExpensesForCategory(@Param("categoryId") Long categoryId);
//

}