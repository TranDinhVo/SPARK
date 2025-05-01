package com.javaweb.model.request;

import java.math.BigDecimal;
import java.time.Instant;

public class GoalRequestDTO {
	private Long id;
	private Long userId;
	// We can keep categoryId for other purposes if needed
	private Long categoryId;
    private String goalName;
    private BigDecimal targetAmount;
    private Instant deadline;
    // Add iconUrl field to directly store the icon URL
    private String iconUrl;
    
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
	public String getGoalName() {
		return goalName;
	}
	public void setGoalName(String goalName) {
		this.goalName = goalName;
	}
	public BigDecimal getTargetAmount() {
		return targetAmount;
	}
	public void setTargetAmount(BigDecimal targetAmount) {
		this.targetAmount = targetAmount;
	}
	public Instant getDeadline() {
		return deadline;
	}
	public void setDeadline(Instant deadline) {
		this.deadline = deadline;
	}
	public String getIconUrl() {
		return iconUrl;
	}
	public void setIconUrl(String iconUrl) {
		this.iconUrl = iconUrl;
	}
	
	public void validate() {
        if (targetAmount == null) {
            throw new IllegalArgumentException("Mục tiêu tiền cần đạt chưa được nhập");
        }
        if(userId == null) {
        	throw new IllegalArgumentException("Id người dùng chưa được nhập");
        }
        if(deadline == null) {
        	throw new IllegalArgumentException("Thời hạn chưa được nhập");
        }
        if(goalName == null) {
        	throw new IllegalArgumentException("Tên mục tiêu tiết kiệm chưa được nhập");
        }
    }
}