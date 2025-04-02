package com.javaweb.repository.Impl;

import com.javaweb.entity.TransactionEntity;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.TypedQuery;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class TransactionRepositoryImpl {
    
    @PersistenceContext
    private EntityManager entityManager;
    
    public List<TransactionEntity> getTransactionsByUserId(Long userId) {
        TypedQuery<TransactionEntity> query = entityManager.createQuery(
            "SELECT t FROM TransactionEntity t WHERE t.userTransaction.id = :userId",
            TransactionEntity.class);
        query.setParameter("userId", userId);
        return query.getResultList();
    }
}