package com.javaweb.model.request;

import java.math.BigDecimal;
import java.time.Instant;

public class TransactionRequestDTO {
	private Long userId; 
    private Long borrowId;
    private Long goalId;
    private Long categoryId;
    private Long recurrenceId;
    private BigDecimal amount;
    private String description;
    private Instant createdAt;



	public TransactionRequestDTO() {}


	public TransactionRequestDTO(Long userId, Long borrowId, Long goalId, Long categoryId, Long recurrenceId,
			BigDecimal amount, String description, Instant createAt) {
		super();
		this.userId = userId;
		this.borrowId = borrowId;
		this.goalId = goalId;
		this.categoryId = categoryId;
		this.recurrenceId = recurrenceId;
		this.amount = amount;
		this.description = description;
		this.createdAt=createAt;
		
	}


	public Long getUserId() {
		return userId;
	}


	public void setUserId(Long userId) {
		this.userId = userId;
	}


	public Long getBorrowId() {
		return borrowId;
	}


	public void setBorrowId(Long borrowId) {
		this.borrowId = borrowId;
	}


	public Long getGoalId() {
		return goalId;
	}


	public void setGoalId(Long goalId) {
		this.goalId = goalId;
	}


	public Long getCategoryId() {
		return categoryId;
	}


	public void setCategoryId(Long categoryId) {
		this.categoryId = categoryId;
	}


	public Long getRecurrenceId() {
		return recurrenceId;
	}


	public void setRecurrenceId(Long recurrenceId) {
		this.recurrenceId = recurrenceId;
	}


	public BigDecimal getAmount() {
		return amount;
	}


	public void setAmount(BigDecimal amount) {
		this.amount = amount;
	}


	public String getDescription() {
		return description;
	}


	public void setDescription(String description) {
		this.description = description;
	}
    
    
	public Instant getCreatedAt() {
		return createdAt;
	}


	public void setCreatedAt(Instant createdAt) {
		this.createdAt = createdAt;
	}
}
