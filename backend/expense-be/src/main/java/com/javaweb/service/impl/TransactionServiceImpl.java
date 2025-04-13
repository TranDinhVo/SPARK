package com.javaweb.service.impl;

import java.util.List;
import java.util.stream.Collectors;
import java.time.Instant;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.javaweb.converter.TransactionConverter;
import com.javaweb.entity.BorrowingEntity;
import com.javaweb.entity.CategoryEntity;
import com.javaweb.entity.GoalEntity;
import com.javaweb.entity.RecurringTransactionEntity;
import com.javaweb.entity.TransactionEntity;
import com.javaweb.entity.UserEntity;
import com.javaweb.model.request.TransactionRequestDTO;
import com.javaweb.model.response.TransactionResponseDTO;
import com.javaweb.repository.BorrowingRepository;
import com.javaweb.repository.CategoryRepository;
import com.javaweb.repository.GoalRepository;
import com.javaweb.repository.RecurringTransactionRepository;
import com.javaweb.repository.TransactionRepository;
//import com.javaweb.repository.UserRepository;
import com.javaweb.service.TransactionService;

@Service
public class TransactionServiceImpl implements TransactionService {

    @Autowired
    private TransactionRepository transactionRepository;

//    @Autowired
//    private UserRepository userRepository;

    
    @Autowired
    private TransactionConverter transactionConverter;

    @Autowired
    private GoalRepository goalRepository;

    @Autowired
    private BorrowingRepository borrowingRepository;
    
    @Autowired
    private CategoryRepository categoryRepository;
    
    @Autowired
    private RecurringTransactionRepository recurringTransactionRepository;

    @Override
    public TransactionResponseDTO createTransaction(TransactionRequestDTO transactionRequest) {
//        UserEntity user = userRepository.findById(transactionRequest.getUserId())
//                .orElseThrow(() -> new RuntimeException("User not found"));
        CategoryEntity category = categoryRepository.findById(transactionRequest.getCategoryId())
                .orElseThrow(() -> new RuntimeException("Category not found"));
        RecurringTransactionEntity recurrence = recurringTransactionRepository.findById(transactionRequest.getRecurrenceId()).orElseThrow();
        
        TransactionEntity transactionEntity = new TransactionEntity();
//        transactionEntity.setUserTransaction(user);
        transactionEntity.setAmount(transactionRequest.getAmount());
        transactionEntity.setCategoryTransaction(category);
        transactionEntity.setDescription(transactionRequest.getDescription());
        transactionEntity.setRecurringTransaction(recurrence);

        TransactionEntity savedTransaction = transactionRepository.save(transactionEntity);

        return transactionConverter.convertToDTO(savedTransaction);
    }

    @Override
    public TransactionResponseDTO getTransactionById(Long id) {
        return transactionRepository.findById(id)
        		.map(transactionEntity -> transactionConverter.convertToDTO(transactionEntity))
                .orElse(null);
    }

    @Override
    public List<TransactionResponseDTO> getTransactionsByUserId(Long userId) {
        return transactionRepository.findByUserTransactionId(userId).stream()
        		.map(transactionEntity -> transactionConverter.convertToDTO(transactionEntity))
                .collect(Collectors.toList());
    }

    @Override
    public List<TransactionResponseDTO> getAllTransactions() {
        List<TransactionEntity> transactions = transactionRepository.findAll();
        return transactions.stream()
        		.map(transactionEntity -> transactionConverter.convertToDTO(transactionEntity))
                .collect(Collectors.toList());
    }

    @Override
    public TransactionResponseDTO updateTransaction(Long id, TransactionRequestDTO transactionRequest) {
        return transactionRepository.findById(id)
                .map(transaction -> {
                    
                    if (transactionRequest.getAmount() != null) {
                        transaction.setAmount(transactionRequest.getAmount());
                    }
                    if (transactionRequest.getDescription() != null) {
                        transaction.setDescription(transactionRequest.getDescription());
                    }

                    if (transactionRequest.getGoalId() != null) {
                        GoalEntity goal = goalRepository.findById(transactionRequest.getGoalId())
                                .orElseThrow(() -> new RuntimeException("Goal not found"));
                        transaction.setGoalTransaction(goal);
                    }

                    if (transactionRequest.getBorrowId() != null) {
                        BorrowingEntity borrowing = borrowingRepository.findById(transactionRequest.getBorrowId())
                                .orElseThrow(() -> new RuntimeException("Borrowing not found"));
                        transaction.setBorrowingTransaction(borrowing);
                    }
                    if(transactionRequest.getCategoryId() != null) {
                    	CategoryEntity category = categoryRepository.findById(transactionRequest.getCategoryId()).orElseThrow(() -> new RuntimeException("Category not found"));
                    	transaction.setCategoryTransaction(category);
                    	
                    }
                    RecurringTransactionEntity recurrence = null;
                    if(transactionRequest.getRecurrenceId() != null) {
                    	 recurrence = recurringTransactionRepository.findById(transactionRequest.getRecurrenceId()).orElseThrow();
                    }
                   
                    transaction.setRecurringTransaction(recurrence);
                    
                    TransactionEntity updatedTransaction = transactionRepository.save(transaction);

                    
                    return transactionConverter.convertToDTO(updatedTransaction);
                })
                .orElse(null);  
    }


    @Override
    public boolean deleteTransaction(Long id) {
        if (transactionRepository.existsById(id)) {
            transactionRepository.deleteById(id);
            return true;
        }
        return false;
    }
    @Override
    public List<TransactionResponseDTO> getTransactionsByDateRange(Long userId, Instant startDate, Instant endDate) {
        List<TransactionEntity> transactions = transactionRepository.findByUserTransactionIdAndCreatedAtBetween(
            userId, startDate, endDate);
        
        return transactions.stream()
            .map(transactionEntity -> transactionConverter.convertToDTO(transactionEntity))
            .collect(Collectors.toList());
    }
   
}
