package com.javaweb.model.request;

import java.math.BigDecimal;

public class TransactionRequestDTO {
	private Long userId; 
    private Long walletId;
    private Long borrowId;
    private Long goalId;
    private Long categoryId;
    private Long recurrenceId;
    private BigDecimal amount;
    private String description;
}
