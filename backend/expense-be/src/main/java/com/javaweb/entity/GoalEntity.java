package com.javaweb.entity;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.ArrayList;
import java.util.List;

import com.javaweb.enums.GoalStatusEnum;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "goal")
@NoArgsConstructor
@AllArgsConstructor
public class GoalEntity {


	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private UserEntity userGoal;
    
    @OneToMany(mappedBy = "goalTransaction", fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
    private List<TransactionEntity> transaction  = new ArrayList<>();

    @Column(name = "goal_name", nullable = false, unique = true, length = 255)
    private String goalName;

    @Column(name = "target_amount", nullable = false, precision = 15, scale = 2)
    private BigDecimal targetAmount;

    @Column(nullable = false)
    private Instant deadline;

    @Enumerated(EnumType.STRING)
    @Column(name="status", nullable = false)
    private GoalStatusEnum status = GoalStatusEnum.DANG_THUC_HIEN;

    @Column(name = "created_at", updatable = false)
    private Instant createdAt = Instant.now();
    
    public Long getId() {
    	return id;
    }
    
    public void setId(Long id) {
    	this.id = id;
    }
    
    public UserEntity getUserGoal() {
    	return userGoal;
    }
    
    public void setUserGoal(UserEntity userGoal) {
    	this.userGoal = userGoal;
    }
    
    public List<TransactionEntity> getTransaction() {
    	return transaction;
    }
    
    public void setTransaction(List<TransactionEntity> transaction) {
    	this.transaction = transaction;
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
    
    public GoalStatusEnum getStatus() {
    	return status;
    }
    
    public void setStatus(GoalStatusEnum status) {
    	this.status = status;
    }
    
    public Instant getCreatedAt() {
    	return createdAt;
    }
    
    public void setCreatedAt(Instant createdAt) {
    	this.createdAt = createdAt;
    }
}
