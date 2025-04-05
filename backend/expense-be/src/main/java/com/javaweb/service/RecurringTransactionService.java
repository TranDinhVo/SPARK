package com.javaweb.service;

import java.util.List;

import com.javaweb.enums.RecurringStatusEnum;
import com.javaweb.model.request.RecurringTransactionRequestDTO;
import com.javaweb.model.response.RecurringTransactionResponseDTO;



public interface RecurringTransactionService {
	List<RecurringTransactionResponseDTO> getAllRecurringTransaction();
	RecurringTransactionResponseDTO getRecurringTransactionById (Long id);
	RecurringTransactionResponseDTO createRecurringTransaction(RecurringTransactionRequestDTO recurringTransactionRequestDTO);
	RecurringTransactionResponseDTO updateRecurringTransaction(Long id, RecurringTransactionRequestDTO recurringTransactiontRequestDTO);
	RecurringTransactionResponseDTO updateRecurringTransactionStatus(Long id, RecurringStatusEnum recurringStatus);
	
	
	void deleteRecurringTransaction(Long id);
}
