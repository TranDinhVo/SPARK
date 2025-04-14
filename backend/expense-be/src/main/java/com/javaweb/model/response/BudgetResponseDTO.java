package com.javaweb.model.response;

import java.math.BigDecimal;
import java.time.Instant;
import java.time.LocalDate;

public class BudgetResponseDTO {
    private Long id;
//    private Long userId;
    private String budgetName;
    private BigDecimal amountLimit;
	private BigDecimal usedAmount;
    private LocalDate startDate;
    private LocalDate endDate;
    private Float alertThreshold;
    private Instant createdAt;
    
	public BudgetResponseDTO(Long id, String budgetName, BigDecimal amountLimit, BigDecimal usedAmount,
			LocalDate startDate, LocalDate endDate, Float alertThreshold, Instant createdAt) {
		super();
		this.id = id;
		this.budgetName = budgetName;
		this.amountLimit = amountLimit;
		this.usedAmount = usedAmount;
		this.startDate = startDate;
		this.endDate = endDate;
		this.alertThreshold = alertThreshold;
		this.createdAt = createdAt;
	}
	public BudgetResponseDTO() {
		super();
	}
	
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getBudgetName() {
		return budgetName;
	}
	public void setBudgetName(String budgetName) {
		this.budgetName = budgetName;
	}
	public BigDecimal getAmountLimit() {
		return amountLimit;
	}
	public void setAmountLimit(BigDecimal amountLimit) {
		this.amountLimit = amountLimit;
	}
	public BigDecimal getUsedAmount() {
		return usedAmount;
	}
	public void setUsedAmount(BigDecimal usedAmount) {
		this.usedAmount = usedAmount;
	}
	public LocalDate getStartDate() {
		return startDate;
	}
	public void setStartDate(LocalDate startDate) {
		this.startDate = startDate;
	}
	public LocalDate getEndDate() {
		return endDate;
	}
	public void setEndDate(LocalDate endDate) {
		this.endDate = endDate;
	}
	public Float getAlertThreshold() {
		return alertThreshold;
	}
	public void setAlertThreshold(Float alertThreshold) {
		this.alertThreshold = alertThreshold;
	}
	public Instant getCreatedAt() {
		return createdAt;
	}
	public void setCreatedAt(Instant createdAt) {
		this.createdAt = createdAt;
	}
}
