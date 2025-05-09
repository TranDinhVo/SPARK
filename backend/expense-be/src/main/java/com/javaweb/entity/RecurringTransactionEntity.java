package com.javaweb.entity;

import java.time.Instant;
import java.time.LocalDate;
import java.util.List;

import com.javaweb.enums.RecurringStatusEnum;
import com.javaweb.enums.RecurringTypeEnum;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "recurring_transactions")
public class RecurringTransactionEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(name = "name", nullable = false)
    private String name;

    @OneToMany(mappedBy = "recurringTransaction", cascade = CascadeType.ALL)
    private List<TransactionEntity> transactions;
    
    @Enumerated(EnumType.STRING)
    @Column(name = "recurrence_type", nullable = false, length = 10)
    private RecurringTypeEnum recurrenceType;

    @Column(name = "next_due_date")
    private LocalDate nextDueDate;

    @Column(name = "auto_create_transaction")
    private Boolean autoCreateTransaction;
    
    @Enumerated(EnumType.STRING)
    @Column(name = "status", length = 20)
    private RecurringStatusEnum status = RecurringStatusEnum.ACTIVE;
    
    @Column(name = "created_at", nullable = false)
    private Instant createAt = Instant.now();
    @Column(name = "user_id", nullable = false)
    private Long userId;
    
    // Getter và setter
    public Long getUserId() {
        return userId;
    }
    
    public void setUserId(Long userId) {
        this.userId = userId;
    }
    
	

    public RecurringTransactionEntity(Long id, String name, List<TransactionEntity> transactions,
			RecurringTypeEnum recurrenceType, LocalDate nextDueDate, Boolean autoCreateTransaction,
			RecurringStatusEnum status, Instant createAt) {
		super();
		this.id = id;
		this.name = name;
		this.transactions = transactions;
		this.recurrenceType = recurrenceType;
		this.nextDueDate = nextDueDate;
		this.autoCreateTransaction = autoCreateTransaction;
		this.status = status;
		this.createAt = createAt;
	}



	public RecurringTransactionEntity() {}



	public Long getId() {
		return id;
	}



	public void setId(Long id) {
		this.id = id;
	}



	public String getName() {
		return name;
	}



	public void setName(String name) {
		this.name = name;
	}



	public List<TransactionEntity> getTransactions() {
		return transactions;
	}



	public void setTransactions(List<TransactionEntity> transactions) {
		this.transactions = transactions;
	}



	public RecurringTypeEnum getRecurrenceType() {
		return recurrenceType;
	}



	public void setRecurrenceType(RecurringTypeEnum recurrenceType) {
		this.recurrenceType = recurrenceType;
	}



	public LocalDate getNextDueDate() {
		return nextDueDate;
	}



	public void setNextDueDate(LocalDate nextDueDate) {
		this.nextDueDate = nextDueDate;
	}



	public Boolean getAutoCreateTransaction() {
		return autoCreateTransaction;
	}



	public void setAutoCreateTransaction(Boolean autoCreateTransaction) {
		this.autoCreateTransaction = autoCreateTransaction;
	}



	public RecurringStatusEnum getStatus() {
		return status;
	}



	public void setStatus(RecurringStatusEnum status) {
		this.status = status;
	}



	public Instant getCreateAt() {
		return createAt;
	}



	public void setCreateAt(Instant createAt) {
		this.createAt = createAt;
	}
	
}
