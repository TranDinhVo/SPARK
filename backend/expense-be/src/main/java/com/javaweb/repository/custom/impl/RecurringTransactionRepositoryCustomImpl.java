package com.javaweb.repository.custom.impl;

import java.time.Instant;
import java.time.ZoneId;
import java.util.List;

import org.springframework.transaction.annotation.Transactional;

import com.javaweb.entity.RecurringTransactionEntity;
import com.javaweb.enums.RecurringTypeEnum;
import com.javaweb.repository.custom.RecurringTransactionRepositoryCustom;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.Query;

public class RecurringTransactionRepositoryCustomImpl implements RecurringTransactionRepositoryCustom {
	@PersistenceContext
    private EntityManager entityManager;
	@Override
	public List<RecurringTransactionEntity> findRecurringTransactionByAuto() {
		StringBuilder sql = new StringBuilder("SELECT b.* \r\n"
				+ "FROM recurring_transactions AS b\r\n"
				+ "WHERE b.auto_create_transaction = 1\r\n"
				+ "AND b.status = 'ACTIVE'\r\n"
				+ "AND b.next_due_date = CURDATE()\r\n"
				+ "AND NOT EXISTS (\r\n"
				+ "  SELECT 1\r\n"
				+ "  FROM transaction t\r\n"
				+ "  WHERE recurring_id = b.id\r\n"
				+ "    AND DATE(t.created_at) = CURDATE()\r\n"
				+ ")");
		Query query = entityManager.createNativeQuery(sql.toString(), RecurringTransactionEntity.class);
		List<RecurringTransactionEntity> result = query.getResultList();
		return result;
	}
	@Transactional
	@Override
	public RecurringTransactionEntity updateEntity(RecurringTransactionEntity entity) {
		if(entity.getRecurrenceType() == RecurringTypeEnum.MONTHLY) {
			entity.setNextDueDate(
					Instant.now()
					.atZone(ZoneId.systemDefault())
					.plusMonths(1)
					.toLocalDateTime()
					.toLocalDate()
					);
		}
		else if(entity.getRecurrenceType() == RecurringTypeEnum.YEARLY) {
			entity.setNextDueDate(
					Instant.now()
					.atZone(ZoneId.systemDefault())
					.plusYears(1)
					.toLocalDateTime()
					.toLocalDate()
					);
		}
		else if(entity.getRecurrenceType() == RecurringTypeEnum.WEEKLY) {
			entity.setNextDueDate(
					Instant.now()
					.atZone(ZoneId.systemDefault())
					.plusWeeks(1)
					.toLocalDateTime()
					.toLocalDate()
					);
		}
		else if(entity.getRecurrenceType() == RecurringTypeEnum.QUARTERLY) {
			entity.setNextDueDate(
					Instant.now()
					.atZone(ZoneId.systemDefault())
					.plusMonths(3)
					.toLocalDateTime()
					.toLocalDate()
					);
		}
		else{
			entity.setNextDueDate(
					Instant.now()
					.atZone(ZoneId.systemDefault())
					.plusDays(1)
					.toLocalDateTime()
					.toLocalDate()
					);
		}
		entityManager.merge(entity);
		return entity;
	}
}
