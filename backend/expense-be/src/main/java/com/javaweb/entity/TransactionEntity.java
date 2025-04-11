package com.javaweb.entity;

import java.math.BigDecimal;
import java.time.Instant;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "transaction")
public class TransactionEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private UserEntity userTransaction;

    @ManyToOne
    @JoinColumn(name = "goal_id")
    private GoalEntity goalTransaction;

    @ManyToOne
    @JoinColumn(name = "borrowing_id")
    private BorrowingEntity borrowingTransaction;

    @ManyToOne
    @JoinColumn(name = "category_id", nullable = false)
    private CategoryEntity categoryTransaction;

    @OneToOne
    @JoinColumn(name = "recurring_id")
    private RecurringTransactionEntity recurringTransaction;
    
    @Column(name = "amount", precision = 15, scale = 2, nullable = false)
    private BigDecimal amount;

    @Column(name = "description", columnDefinition = "TEXT")
    private String description;

   
    @Column(name = "status")
    private Boolean status = true;

    @Column(name = "created_at", updatable = false)
    private Instant createdAt = Instant.now();
	public TransactionEntity() {}
	public TransactionEntity(Long id, UserEntity userTransaction, GoalEntity goalTransaction,
			BorrowingEntity borrowingTransaction, CategoryEntity categoryTransaction,
			RecurringTransactionEntity recurringTransaction, BigDecimal amount, String description, Boolean status,
			Instant createdAt) {
		super();
		this.id = id;
		this.userTransaction = userTransaction;
		this.goalTransaction = goalTransaction;
		this.borrowingTransaction = borrowingTransaction;
		this.categoryTransaction = categoryTransaction;
		this.recurringTransaction = recurringTransaction;
		this.amount = amount;
		this.description = description;
		this.status = status;
		this.createdAt = createdAt;
	}
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public UserEntity getUserTransaction() {
		return userTransaction;
	}
	public void setUserTransaction(UserEntity userTransaction) {
		this.userTransaction = userTransaction;
	}
	public GoalEntity getGoalTransaction() {
		return goalTransaction;
	}
	public void setGoalTransaction(GoalEntity goalTransaction) {
		this.goalTransaction = goalTransaction;
	}
	public BorrowingEntity getBorrowingTransaction() {
		return borrowingTransaction;
	}
	public void setBorrowingTransaction(BorrowingEntity borrowingTransaction) {
		this.borrowingTransaction = borrowingTransaction;
	}
	public CategoryEntity getCategoryTransaction() {
		return categoryTransaction;
	}
	public void setCategoryTransaction(CategoryEntity categoryTransaction) {
		this.categoryTransaction = categoryTransaction;
	}
	public RecurringTransactionEntity getRecurringTransaction() {
		return recurringTransaction;
	}
	public void setRecurringTransaction(RecurringTransactionEntity recurringTransaction) {
		this.recurringTransaction = recurringTransaction;
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
	    
}
