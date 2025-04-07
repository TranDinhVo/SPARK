package com.javaweb.service.impl;

import com.javaweb.model.dto.BudgetDTO;
import com.javaweb.model.request.BudgetRequest;
import com.javaweb.entity.BudgetEntity;
import com.javaweb.entity.CategoryEntity;
import com.javaweb.entity.TransactionEntity;
import com.javaweb.entity.UserEntity;
import com.javaweb.repository.BudgetRepository;
import com.javaweb.repository.CategoryRepository;
import com.javaweb.repository.TransactionRepository;
import com.javaweb.repository.UserRepository;
import com.javaweb.converter.BudgetConverter;
import com.javaweb.service.BudgetService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class BudgetServiceImpl implements BudgetService {

    @Autowired
    private BudgetRepository budgetRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private CategoryRepository categoryRepository;
    
    @Autowired
    private TransactionRepository transactionRepository;
    
    @Autowired
    private BudgetConverter budgetConverter;

    @Override
    public List<BudgetDTO> getAllBudgets(Long userId) {
        List<BudgetEntity> budgets = budgetRepository.findByUserBudgetId(userId);
        return budgets.stream()
                .map(budget -> budgetConverter.convertToDTO(budget, 
                     calculateCurrentSpending(
                        budget.getUserBudget().getId(),
                        budget.getCategoryBudget().getId(),
                        budget.getStartDate(),
                        budget.getEndDate())))
                .collect(Collectors.toList());
    }

    @Override
    public BudgetDTO getBudgetById(Long userId, Long budgetId) {
        BudgetEntity budget = budgetRepository.findByIdAndUserBudgetId(budgetId, userId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Budget not found"));
        
        BigDecimal currentSpending = calculateCurrentSpending(
                budget.getUserBudget().getId(),
                budget.getCategoryBudget().getId(),
                budget.getStartDate(),
                budget.getEndDate());
                
        return budgetConverter.convertToDTO(budget, currentSpending);
    }

    @Override
    public BudgetDTO createBudget(BudgetRequest budgetRequest) {
        UserEntity user = userRepository.findById(budgetRequest.getUserId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found"));

        CategoryEntity category = categoryRepository.findById(budgetRequest.getCategoryId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Category not found"));

        //kiểm tra có budget cho category và ng dùng chưa
        Optional<BudgetEntity> existingBudget = budgetRepository.findByUserBudgetIdAndCategoryBudgetId(
                budgetRequest.getUserId(), budgetRequest.getCategoryId());
        
        if (existingBudget.isPresent()) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Budget already exists for this category");
        }

        BudgetEntity budget = new BudgetEntity();
        budget.setUserBudget(user);
        budget.setCategoryBudget(category);
        budget.setAmountLimit(budgetRequest.getAmountLimit());
        budget.setStartDate(budgetRequest.getStartDate());
        budget.setEndDate(budgetRequest.getEndDate());
        
        if (budgetRequest.getAlertThreshold() != null) {
            budget.setAlertThreshold(budgetRequest.getAlertThreshold());
        }

        BudgetEntity savedBudget = budgetRepository.save(budget);
        
        BigDecimal currentSpending = calculateCurrentSpending(
                savedBudget.getUserBudget().getId(),
                savedBudget.getCategoryBudget().getId(),
                savedBudget.getStartDate(),
                savedBudget.getEndDate());
                
        return budgetConverter.convertToDTO(savedBudget, currentSpending);
    }

    @Override
    public BudgetDTO updateBudget(Long userId, Long budgetId, BudgetRequest budgetRequest) {
        BudgetEntity budget = budgetRepository.findByIdAndUserBudgetId(budgetId, userId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Budget not found"));

        if (budgetRequest.getAmountLimit() != null) {
            budget.setAmountLimit(budgetRequest.getAmountLimit());
        }
        if (budgetRequest.getStartDate() != null) {
            budget.setStartDate(budgetRequest.getStartDate());
        }
        if (budgetRequest.getEndDate() != null) {
            budget.setEndDate(budgetRequest.getEndDate());
        }
        if (budgetRequest.getAlertThreshold() != null) {
            budget.setAlertThreshold(budgetRequest.getAlertThreshold());
        }
        if (budgetRequest.getCategoryId() != null && !budgetRequest.getCategoryId().equals(budget.getCategoryBudget().getId())) {
            CategoryEntity category = categoryRepository.findById(budgetRequest.getCategoryId())
                    .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Category not found"));
            budget.setCategoryBudget(category);
        }

        BudgetEntity updatedBudget = budgetRepository.save(budget);
        
        BigDecimal currentSpending = calculateCurrentSpending(
                updatedBudget.getUserBudget().getId(),
                updatedBudget.getCategoryBudget().getId(),
                updatedBudget.getStartDate(),
                updatedBudget.getEndDate());
                
        return budgetConverter.convertToDTO(updatedBudget, currentSpending);
    }

    @Override
    public void deleteBudget(Long userId, Long budgetId) {
        BudgetEntity budget = budgetRepository.findByIdAndUserBudgetId(budgetId, userId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Budget not found"));
        budgetRepository.delete(budget);
    }
    
    private BigDecimal calculateCurrentSpending(Long userId, Long categoryId, LocalDate startDate, LocalDate endDate) {
        //lấy tất cả Transaction cho ng dùng và danh mục này
        List<TransactionEntity> transactions = transactionRepository.findByUserTransactionId(userId);
        
        //lọc giao dịch theo danh mục và khoản thời gian
        BigDecimal totalSpent = transactions.stream()
                .filter(t -> t.getCategoryTransaction().getId().equals(categoryId))
                .filter(t -> {
                    LocalDate transactionDate = t.getCreatedAt().atZone(java.time.ZoneOffset.UTC).toLocalDate();
                    return !transactionDate.isBefore(startDate) && !transactionDate.isAfter(endDate);
                })
                .map(TransactionEntity::getAmount)
                .reduce(BigDecimal.ZERO, BigDecimal::add);
                
        return totalSpent;
    }
}