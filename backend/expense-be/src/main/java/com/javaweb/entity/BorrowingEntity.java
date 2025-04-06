package com.javaweb.entity;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.ArrayList;
import java.util.List;

import com.javaweb.enums.BorrowingStatusEnum;
import com.javaweb.enums.LoanTypeEnum;
import com.javaweb.model.response.BorrowingResponseDTO;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.ColumnResult;
import jakarta.persistence.ConstructorResult;
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
import jakarta.persistence.SqlResultSetMapping;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "borrowing")
public class BorrowingEntity {

	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private UserEntity userBorrowing;

    @ManyToOne
    @JoinColumn(name = "wallet_id", nullable = false)
    private WalletEntity walletBorrowing;
    
    @OneToMany(mappedBy = "borrowingTransaction", fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
    private List<TransactionEntity> transaction  = new ArrayList<>();
    
    @Column(name = "counterparty_name", nullable = false)
    private String counterpartyName;
    
    @Column(name = "amount", precision = 15, scale = 2, nullable = false)
    private BigDecimal amount;
    
    @Column(name = "interest_rate", precision = 5, scale = 2, nullable = false)
    private BigDecimal interestRate = BigDecimal.ZERO;
    
    @Column(name = "deadline", nullable = false)
    private Instant deadline;
    
    @Enumerated(EnumType.STRING)
    @Column(name = "loan_type", nullable = false, length = 20)
    private LoanTypeEnum loanType;
    
    @Enumerated(EnumType.STRING)
    @Column(name = "status", length = 20)
    private BorrowingStatusEnum status = BorrowingStatusEnum.DANG_HOAT_DONG;
    
    @Column(name = "created_at", updatable = false)
    private Instant createdAt = Instant.now();
    
    public BorrowingEntity() {
    	super();
    }
    
    public BorrowingEntity(Long id, UserEntity userBorrowing, WalletEntity walletBorrowing,
			List<TransactionEntity> transaction, String counterpartyName, BigDecimal amount, BigDecimal interestRate,
			Instant deadline, LoanTypeEnum loanType, BorrowingStatusEnum status, Instant createdAt) {
		super();
		this.id = id;
		this.userBorrowing = userBorrowing;
		this.walletBorrowing = walletBorrowing;
		this.transaction = transaction;
		this.counterpartyName = counterpartyName;
		this.amount = amount;
		this.interestRate = interestRate;
		this.deadline = deadline;
		this.loanType = loanType;
		this.status = status;
		this.createdAt = createdAt;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public UserEntity getUserBorrowing() {
		return userBorrowing;
	}

	public void setUserBorrowing(UserEntity userBorrowing) {
		this.userBorrowing = userBorrowing;
	}

	public WalletEntity getWalletBorrowing() {
		return walletBorrowing;
	}

	public void setWalletBorrowing(WalletEntity walletBorrowing) {
		this.walletBorrowing = walletBorrowing;
	}

	public List<TransactionEntity> getTransaction() {
		return transaction;
	}

	public void setTransaction(List<TransactionEntity> transaction) {
		this.transaction = transaction;
	}

	public String getCounterpartyName() {
		return counterpartyName;
	}

	public void setCounterpartyName(String counterpartyName) {
		this.counterpartyName = counterpartyName;
	}

	public BigDecimal getAmount() {
		return amount;
	}

	public void setAmount(BigDecimal amount) {
		this.amount = amount;
	}

	public BigDecimal getInterestRate() {
		return interestRate;
	}

	public void setInterestRate(BigDecimal interestRate) {
		this.interestRate = interestRate;
	}

	public Instant getDeadline() {
		return deadline;
	}

	public void setDeadline(Instant deadline) {
		this.deadline = deadline;
	}

	public LoanTypeEnum getLoanType() {
		return loanType;
	}

	public void setLoanType(LoanTypeEnum loanType) {
		this.loanType = loanType;
	}

	public BorrowingStatusEnum getStatus() {
		return status;
	}

	public void setStatus(BorrowingStatusEnum status) {
		this.status = status;
	}

	public Instant getCreatedAt() {
		return createdAt;
	}

	public void setCreatedAt(Instant createdAt) {
		this.createdAt = createdAt;
	}
}
