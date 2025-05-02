package com.javaweb.service.impl;

import java.time.Instant;
import java.util.List;
import java.util.stream.Collectors;

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
import com.javaweb.repository.UserRepository;
import com.javaweb.service.TransactionService;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class TransactionServiceImpl implements TransactionService {

    @Autowired
    private TransactionRepository transactionRepository;

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

    @Autowired
    private UserRepository userRepository;

    @Override
    @Transactional
    public TransactionResponseDTO createTransaction(TransactionRequestDTO transactionRequest) {
        try {
            // Tìm user theo userId
            UserEntity user = userRepository.findById(transactionRequest.getUserId())
                    .orElseThrow(() -> new RuntimeException("User not found"));
            
            // Tìm category theo categoryId
            CategoryEntity category = categoryRepository.findById(transactionRequest.getCategoryId())
                    .orElseThrow(() -> new RuntimeException("Category not found"));

            // Xử lý recurrenceId
            RecurringTransactionEntity recurrence = null;
            if (transactionRequest.getRecurrenceId() != null) {
                recurrence = recurringTransactionRepository.findById(transactionRequest.getRecurrenceId())
                        .orElse(null);
            }

            // Tạo entity mới
            TransactionEntity transactionEntity = new TransactionEntity();
            transactionEntity.setUserTransaction(user);
            transactionEntity.setAmount(transactionRequest.getAmount());
            transactionEntity.setCategoryTransaction(category);
            transactionEntity.setDescription(transactionRequest.getDescription());
            transactionEntity.setRecurringTransaction(recurrence);
            
            // Xử lý createdAt - thiết lập giá trị mặc định nếu không được cung cấp
            if (transactionRequest.getCreatedAt() != null) {
                transactionEntity.setCreatedAt(transactionRequest.getCreatedAt());
            } else {
                transactionEntity.setCreatedAt(Instant.now());  // Thiết lập mặc định tại đây
            }
            
            // Xử lý goalId nếu có
            if (transactionRequest.getGoalId() != null) {
                GoalEntity goal = goalRepository.findById(transactionRequest.getGoalId())
                        .orElse(null);
                transactionEntity.setGoalTransaction(goal);
            }
            
            // Xử lý borrowId nếu có
            if (transactionRequest.getBorrowId() != null) {
                BorrowingEntity borrowing = borrowingRepository.findById(transactionRequest.getBorrowId())
                        .orElse(null);
                transactionEntity.setBorrowingTransaction(borrowing);
            }

            // Lưu và lấy kết quả
            TransactionEntity savedTransaction = transactionRepository.save(transactionEntity);

            // Convert và trả về response
            return transactionConverter.convertToDTO(savedTransaction);
        } catch (Exception e) {
            System.err.println("Error creating transaction: " + e.getMessage());
            e.printStackTrace();
            throw e;
        }
    }

    @Override
    public TransactionResponseDTO getTransactionById(Long id) {
        return transactionRepository.findById(id)
                .map(transactionConverter::convertToDTO)
                .orElse(null);
    }

    @Override
    public List<TransactionResponseDTO> getTransactionsByUserId(Long userId) {
        return transactionRepository.findByUserTransactionId(userId).stream()
                .map(transactionConverter::convertToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public List<TransactionResponseDTO> getAllTransactions() {
        return transactionRepository.findAll().stream()
                .map(transactionConverter::convertToDTO)
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
                    if (transactionRequest.getCreatedAt() != null) {
                        transaction.setCreatedAt(transactionRequest.getCreatedAt());
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
                    if (transactionRequest.getCategoryId() != null) {
                        CategoryEntity category = categoryRepository.findById(transactionRequest.getCategoryId())
                                .orElseThrow(() -> new RuntimeException("Category not found"));
                        transaction.setCategoryTransaction(category);
                    }
                    if (transactionRequest.getRecurrenceId() != null) {
                        RecurringTransactionEntity recurrence = recurringTransactionRepository.findById(transactionRequest.getRecurrenceId())
                                .orElse(null);
                        transaction.setRecurringTransaction(recurrence);
                    }

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
        return transactionRepository.findByUserTransactionIdAndCreatedAtBetween(userId, startDate, endDate).stream()
                .map(transactionConverter::convertToDTO)
                .collect(Collectors.toList());
    }
}
