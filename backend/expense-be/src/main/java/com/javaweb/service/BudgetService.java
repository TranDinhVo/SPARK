package com.javaweb.service;

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
public class BudgetService {

    @Autowired
    private BudgetRepository budgetRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private TransactionRepository transactionRepository;

    public List<BudgetDTO> getAllBudgets(Long userId) {
        List<BudgetEntity> budgets = budgetRepository.findByUserBudgetId(userId);
        return budgets.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public BudgetDTO getBudgetById(Long userId, Long budgetId) {
        BudgetEntity budget = budgetRepository.findByIdAndUserBudgetId(budgetId, userId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Budget not found"));
        return convertToDTO(budget);
    }

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
        return convertToDTO(savedBudget);
    }

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
        return convertToDTO(updatedBudget);
    }

    public void deleteBudget(Long userId, Long budgetId) {
        BudgetEntity budget = budgetRepository.findByIdAndUserBudgetId(budgetId, userId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Budget not found"));
        budgetRepository.delete(budget);
    }

    private BudgetDTO convertToDTO(BudgetEntity budget) {
        BudgetDTO dto = new BudgetDTO();
        dto.setId(budget.getId());
        dto.setAmountLimit(budget.getAmountLimit());
        dto.setStartDate(budget.getStartDate());
        dto.setEndDate(budget.getEndDate());
        dto.setCategory(budget.getCategoryBudget().getName());
        dto.setAlertThreshold(budget.getAlertThreshold());
        
        // Tính chi tiêu hiên tại trong thời gian hiện tại
        BigDecimal moneyCurrent = calculateCurrentSpending(
                budget.getUserBudget().getId(),
                budget.getCategoryBudget().getId(),
                budget.getStartDate(),
                budget.getEndDate()
        );
        
        dto.setMoneyCurrent(moneyCurrent);
        
        return dto;
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