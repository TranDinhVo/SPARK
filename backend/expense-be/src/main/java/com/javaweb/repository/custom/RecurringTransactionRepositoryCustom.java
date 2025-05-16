package com.javaweb.repository.custom;

import java.util.List;

import com.javaweb.entity.RecurringTransactionEntity;

public interface RecurringTransactionRepositoryCustom {
	List<RecurringTransactionEntity> findRecurringTransactionByAuto();
	RecurringTransactionEntity updateEntity(RecurringTransactionEntity entity);
}
