package com.javaweb.model.response;

import java.math.BigDecimal;
import java.time.Instant;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.javaweb.enums.GoalStatusEnum;

public class GoalResponseDTO {
    private Long id;
//    private Long userId;
    private String goalName;
    private BigDecimal targetAmount;
    private BigDecimal currentAmount;
    private Instant createdAt;
    private Instant deadline;
    private GoalStatusEnum status;

	public GoalResponseDTO(Long id, String nameGoal, BigDecimal targetAmount, Instant deadline, String status, Instant createAt, BigDecimal currentAmount) {
    	this.id = id;
//    	this.userId = userId;
    	this.goalName = nameGoal;
    	this.targetAmount = targetAmount;
    	this.currentAmount = currentAmount;
    	this.createdAt = createAt;
    	this.deadline = deadline;
    	this.status =  GoalStatusEnum.valueOf(status);
    }
    

	public GoalResponseDTO() {
		super();
	}
//	public Long getUserId() {
//		return userId;
//	}
//	
//	public void setUserId(Long userId) {
//		this.userId = userId;
//	}
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
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
	public BigDecimal getCurrentAmount() {
		return currentAmount;
	}
	public void setCurrentAmount(BigDecimal currentAmount) {
		this.currentAmount = currentAmount;
	}
	public Instant getCreatedAt() {
		return createdAt;
	}
	public void setCreatedAt(Instant createdAt) {
		this.createdAt = createdAt;
	}
	public Instant getDeadline() {
		return deadline;
	}
	public void setDeadline(Instant deadline) {
		this.deadline = deadline;
	}
	public GoalStatusEnum getStatus() {
		return status;
	}
	public void setStatus(GoalStatusEnum status) {
		this.status = status;
	}

}
