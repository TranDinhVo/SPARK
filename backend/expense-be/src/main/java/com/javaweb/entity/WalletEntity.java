package com.javaweb.entity;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.ArrayList;
import java.util.List;

import com.javaweb.enums.CurrencyEnum;

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
import jakarta.persistence.PreUpdate;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "wallet")
public class WalletEntity {
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private UserEntity userWallet;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "balance", precision = 15, scale = 2)
    private BigDecimal balance = BigDecimal.ZERO;

    @Enumerated(EnumType.STRING)
    @Column(name = "currency", length = 10)
    private CurrencyEnum currency = CurrencyEnum.VND;
    
    @Column(name = "created_at", updatable = false)
    private Instant createdAt = Instant.now();
    
    @Column(name = "updated_at")
    private Instant updatedAt = Instant.now();
    
    @OneToMany(mappedBy = "walletBorrowing", fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
    private List<BorrowingEntity> borrowing  = new ArrayList<>();
    
    @OneToMany(mappedBy = "walletTransaction", fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
    private List<TransactionEntity> transaction  = new ArrayList<>();
    
    @PreUpdate
    protected void onUpdate() {
    	updatedAt = Instant.now();
    }
    
    public Long getId() {
    	return id;
    }
    
    public void setId(Long id) {
    	this.id = id;
    }
    
    public UserEntity getUserWallet() {
    	return userWallet;
    }
    
    public void setUserWallet(UserEntity userWallet) {
    	this.userWallet = userWallet;
    }
    
    public String getName() {
    	return name;
    }
    
    public void setName(String name) {
    	this.name = name;
    }
    
    public BigDecimal getBalance() {
    	return balance;
    }
    
    public void setBalance(BigDecimal balance) {
    	this.balance = balance;
    }
    
    public CurrencyEnum getCurrency() {
    	return currency;
    }
    
    public void setCurrency(CurrencyEnum currency) {
    	this.currency = currency;
    }
    
    public Instant getCreatedAt() {
    	return createdAt;
    }
    
    public void setCreatedAt(Instant createdAt) {
    	this.createdAt = createdAt;
    }
    
    public Instant getUpdatedAt() {
    	return updatedAt;
    }
    
    public void setUpdatedAt(Instant updatedAt) {
    	this.updatedAt = updatedAt;
    }
    
    public List<BorrowingEntity> getBorrowing() {
    	return borrowing;
    }
    
    public void setBorrowing(List<BorrowingEntity> borrowing) {
    	this.borrowing = borrowing;
    }
    
    public List<TransactionEntity> getTransaction() {
    	return transaction;
    }
    
    public void setTransaction(List<TransactionEntity> transaction) {
    	this.transaction = transaction;
    }
}
