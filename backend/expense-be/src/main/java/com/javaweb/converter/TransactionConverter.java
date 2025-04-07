package com.javaweb.converter;

import org.springframework.beans.factory.annotation.Autowired;

import com.javaweb.entity.TransactionEntity;
import com.javaweb.model.response.RecurringTransactionResponseDTO;
import com.javaweb.model.response.TransactionResponseDTO;
import com.javaweb.model.response.WalletResponseDTO;

public class TransactionConverter {
	@Autowired
	private RecurringTransactionConverter recurringTransactionConverter;
	
	
	public TransactionResponseDTO convertToDTO(TransactionEntity entity) {
        WalletResponseDTO wallet = new WalletResponseDTO();
        wallet.setId(entity.getWalletTransaction().getId());
        wallet.setName(entity.getWalletTransaction().getName());

        RecurringTransactionResponseDTO recurrence = null;
        if (entity.getRecurringTransaction() != null) {
            recurrence = recurringTransactionConverter.convertToResponse(entity.getRecurringTransaction());
        }

        return new TransactionResponseDTO(
                entity.getId(),
                entity.getUserTransaction().getId(),
                wallet,
                entity.getBorrowingTransaction() != null ? entity.getBorrowingTransaction().getId() : null,
                entity.getCategoryTransaction().getCategoryType().getName(),
                entity.getCategoryTransaction().getName(),
                entity.getAmount(),
                entity.getDescription(),
                entity.getStatus(),
                entity.getCreatedAt(),
                recurrence
        );
    }
}
