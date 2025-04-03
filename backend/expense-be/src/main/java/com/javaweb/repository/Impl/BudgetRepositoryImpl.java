package com.javaweb.repository.Impl;

import com.javaweb.entity.BudgetEntity;
import com.javaweb.repository.BudgetRepository;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.TypedQuery;

import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class BudgetRepositoryImpl {
    // Remove the BudgetRepository dependency and use EntityManager directly
    @PersistenceContext
    private EntityManager entityManager;
    
    public List<BudgetEntity> getBudgetsByUserId(Long userId) {
        // Use EntityManager for custom queries instead of depending on BudgetRepository
        TypedQuery<BudgetEntity> query = entityManager.createQuery(
            "SELECT b FROM BudgetEntity b WHERE b.userBudget.id = :userId", 
            BudgetEntity.class);
        query.setParameter("userId", userId);
        return query.getResultList();
    }
}