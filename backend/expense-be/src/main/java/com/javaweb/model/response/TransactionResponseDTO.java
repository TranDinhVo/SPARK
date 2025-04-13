package com.javaweb.model.response;


import java.math.BigDecimal;
import java.time.Instant;

public class TransactionResponseDTO {
	
	
    private Long id;
    private Long userId;
    private Long borrowId;
    private Long goalId;
    private String type;
    private String name;
    private BigDecimal amount;
    private String description; 
    private Boolean status;
    private Instant createdAt;
    private RecurringTransactionResponseDTO recurrence;
    
	public TransactionResponseDTO() {}
	
	public TransactionResponseDTO(Long id, Long userId, Long borrowId, Long goalId,
			String type, String name, BigDecimal amount, String description, Boolean status, Instant createdAt,
			RecurringTransactionResponseDTO recurrence) {
		super();
		this.id = id;
		this.userId = userId;
		this.borrowId = borrowId;
		this.goalId = goalId;
		this.type = type;
		this.name = name;
		this.amount = amount;
		this.description = description;
		this.status = status;
		this.createdAt = createdAt;
		this.recurrence = recurrence;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
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

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
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

	public Boolean getStatus() {
		return status;
	}

	public void setStatus(Boolean status) {
		this.status = status;
	}

	public Instant getCreatedAt() {
		return createdAt;
	}

	public void setCreatedAt(Instant createdAt) {
		this.createdAt = createdAt;
	}

	public RecurringTransactionResponseDTO getRecurrence() {
		return recurrence;
	}

	public void setRecurrence(RecurringTransactionResponseDTO recurrence) {
		this.recurrence = recurrence;
	} 
    
	
}
