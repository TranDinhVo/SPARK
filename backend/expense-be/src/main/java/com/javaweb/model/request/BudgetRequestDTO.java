package com.javaweb.model.request;

import java.math.BigDecimal;
import java.time.LocalDate;

public class BudgetRequestDTO {
	private Long id;
    private Long userId;
    private Long categoryId;
    private BigDecimal amountLimit;
    private LocalDate startDate;
    private LocalDate endDate;
    private Float alertThreshold = 0.8f;
    
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
	public Long getCategoryId() {
		return categoryId;
	}
	public void setCategoryId(Long categoryId) {
		this.categoryId = categoryId;
	}
	public BigDecimal getAmountLimit() {
		return amountLimit;
	}
	public void setAmountLimit(BigDecimal amountLimit) {
		this.amountLimit = amountLimit;
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
	public void validate() {
        if (amountLimit == null) {
            throw new IllegalArgumentException("Ngân sách tiền cần đạt chưa được nhập");
        }
        if(userId == null) {
        	throw new IllegalArgumentException("Id người dùng chưa được nhập");
        }
        if(startDate == null) {
        	throw new IllegalArgumentException("Thời gian bắt đầu chưa được nhập");
        }
        if(endDate == null) {
        	throw new IllegalArgumentException("Thời gian kết thúc chưa được nhập");
        }
    }
}
