package com.javaweb.service;
import java.util.List;
import java.util.Map;
import java.time.Instant;
import com.javaweb.model.request.TransactionRequestDTO;
import com.javaweb.model.response.TransactionResponseDTO;

public interface TransactionService {
    TransactionResponseDTO createTransaction(TransactionRequestDTO transactionRequest);
    TransactionResponseDTO getTransactionById(Long id);
    List<TransactionResponseDTO> getTransactionsByUserId(Long userId);
    List<TransactionResponseDTO> getAllTransactions();
    TransactionResponseDTO updateTransaction(Long id, TransactionRequestDTO transactionRequest);
    Map<String, Object> deleteTransaction(Long id);  // Thay đổi kiểu trả về từ boolean sang Map<String, Object>
    List<TransactionResponseDTO> getTransactionsByDateRange(Long userId, Instant startDate, Instant endDate);
}