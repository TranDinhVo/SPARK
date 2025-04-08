package com.javaweb.model.response;

import java.math.BigDecimal;
import java.time.Instant;
import java.time.LocalDate;

import com.javaweb.entity.CategoryEntity;
import com.javaweb.entity.UserEntity;

import jakarta.persistence.Column;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

public class BudgetResponseDTO {
    private Long id;
//    private Long userId;
    private String budgetName;
    private BigDecimal amountLimit;
	private BigDecimal usedAmount;
    private Instant startDate;
    private Instant endDate;
    private Float alertThreshold;
    private Instant createdAt;
    
	public BudgetResponseDTO(Long id, BigDecimal amountLimit, Instant startDate, Instant endDate,
			Float alertThreshold, Instant createdAt, BigDecimal usedAmount, String budgetName) {
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
	public String getCategoryName() {
		return budgetName;
	}
	public void setCategoryName(String categoryName) {
		this.budgetName = categoryName;
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
	public Instant getStartDate() {
		return startDate;
	}
	public void setStartDate(Instant startDate) {
		this.startDate = startDate;
	}
	public Instant getEndDate() {
		return endDate;
	}
	public void setEndDate(Instant endDate) {
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
