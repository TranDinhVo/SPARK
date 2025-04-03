package com.javaweb.model;


import java.math.BigDecimal;
import java.time.Instant;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class TransactionResponseDTO {
	
	
    private Long id;
    private BigDecimal amount;
    private String type;
    private String description;
    private Boolean status;
    private Instant createdAt;

    private TransactionCategoryDTO category; 
    private String paymentMethod; // Chỉ lấy paymentMethod từ WalletEntity
    private RecurringTransactionResponseDTO recurrence; // Format riêng cho RecurringTransactionEntity
//    private BorrowingDTO borrowing; // Thêm BorrowingEntity
//    private GoalDTO goal; // Thêm GoalEntity
}
