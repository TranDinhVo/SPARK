package com.javaweb.repository.Impl;

import com.javaweb.entity.RecurringTransactionEntity;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
public class RecurringTransactionRepositoryImpl {
    
    @PersistenceContext
    private EntityManager entityManager;
    
    @Transactional
    public RecurringTransactionEntity saveRecurringTransaction(RecurringTransactionEntity entity) {
        if (entity.getId() == null) {
            entityManager.persist(entity);
            return entity;
        } else {
            return entityManager.merge(entity);
        }
    }
    
    public RecurringTransactionEntity findById(Long id) {
        return entityManager.find(RecurringTransactionEntity.class, id);
    }
}