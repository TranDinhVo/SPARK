package com.javaweb.entity;

import java.math.BigDecimal;
import java.time.Instant;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import com.javaweb.enums.BorrowingStatusEnum;
import com.javaweb.enums.LoanTypeEnum;

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

@Entity
@Table(name = "borrowing")
public class BorrowingEntity {

	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private UserEntity userBorrowing;
    
    @OneToMany(mappedBy = "borrowingTransaction", fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
    private List<TransactionEntity> transaction  = new ArrayList<>();
    
    @Column(name = "counterparty_name", nullable = false)
    private String counterpartyName;
    
    @Column(name = "amount_loan", precision = 15, scale = 2, nullable = false)
    private BigDecimal amountLoan = BigDecimal.ZERO; // Thêm giá trị mặc định
    
    @Column(name = "interest_rate", precision = 5, scale = 2, nullable = false)
    private BigDecimal interestRate = BigDecimal.ZERO;
    
    @Column(name = "times", nullable = false)
    private Long times = 0L;
    
    @Column(name = "amount", nullable = false)
    private BigDecimal amount = BigDecimal.ZERO; // Thêm giá trị mặc định
    
    @Enumerated(EnumType.STRING)
    @Column(name = "loan_type", nullable = false, length = 20)
    private LoanTypeEnum loanType;
    
    @Enumerated(EnumType.STRING)
    @Column(name = "status", length = 20)
    private BorrowingStatusEnum status = BorrowingStatusEnum.DANG_HOAT_DONG;
    
    @Column(name="auto_create_transaction")
    private Boolean autoCreateTransaction = false;
    
    @Column(name = "created_at", updatable = false)
    private Instant createdAt = Instant.now();
    
    @Column(name = "next_due_date")
    private LocalDate nextDueDate;
    
    public BorrowingEntity() {
    	super();
    }

	public BorrowingEntity(Long id, UserEntity userBorrowing, List<TransactionEntity> transaction,
			String counterpartyName, BigDecimal amountLoan, BigDecimal interestRate, Long times, BigDecimal amount,
			LoanTypeEnum loanType, BorrowingStatusEnum status, Boolean autoCreateTransaction, Instant createdAt, LocalDate nextDueDate) {
		super();
		this.id = id;
		this.userBorrowing = userBorrowing;
		this.transaction = transaction;
		this.counterpartyName = counterpartyName;
		this.amountLoan = amountLoan != null ? amountLoan : BigDecimal.ZERO; // Kiểm tra null
		this.interestRate = interestRate != null ? interestRate : BigDecimal.ZERO; // Kiểm tra null
		this.times = times != null ? times : 0L;
		this.amount = amount != null ? amount : BigDecimal.ZERO; // Kiểm tra null
		this.loanType = loanType;
		this.status = status != null ? status : BorrowingStatusEnum.DANG_HOAT_DONG; // Kiểm tra null
		this.autoCreateTransaction = autoCreateTransaction != null ? autoCreateTransaction : false; // Kiểm tra null
		this.createdAt = createdAt != null ? createdAt : Instant.now(); // Kiểm tra null
		this.nextDueDate = nextDueDate;
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

	public BigDecimal getAmountLoan() {
		return amountLoan != null ? amountLoan : BigDecimal.ZERO; // Đảm bảo không trả về null
	}

	public void setAmountLoan(BigDecimal amountLoan) {
		this.amountLoan = amountLoan != null ? amountLoan : BigDecimal.ZERO; // Kiểm tra null
	}

	public BigDecimal getInterestRate() {
		return interestRate != null ? interestRate : BigDecimal.ZERO; // Đảm bảo không trả về null
	}

	public void setInterestRate(BigDecimal interestRate) {
		this.interestRate = interestRate != null ? interestRate : BigDecimal.ZERO; // Kiểm tra null
	}

	public Long getTimes() {
		return times != null ? times : 0L; // Đảm bảo không trả về null
	}

	public void setTimes(Long times) {
		this.times = times != null ? times : 0L;
	}

	public BigDecimal getAmount() {
		return amount != null ? amount : BigDecimal.ZERO; // Đảm bảo không trả về null
	}

	public void setAmount(BigDecimal amount) {
		this.amount = amount != null ? amount : BigDecimal.ZERO; // Kiểm tra null
	}

	public LoanTypeEnum getLoanType() {
		return loanType;
	}

	public void setLoanType(LoanTypeEnum loanType) {
		this.loanType = loanType;
	}

	public BorrowingStatusEnum getStatus() {
		return status != null ? status : BorrowingStatusEnum.DANG_HOAT_DONG; // Đảm bảo không trả về null
	}

	public void setStatus(BorrowingStatusEnum status) {
		this.status = status != null ? status : BorrowingStatusEnum.DANG_HOAT_DONG; // Kiểm tra null
	}

	public Boolean getAutoCreateTransaction() {
		return autoCreateTransaction != null ? autoCreateTransaction : false; // Đảm bảo không trả về null
	}

	public void setAutoCreateTransaction(Boolean autoCreateTransaction) {
		this.autoCreateTransaction = autoCreateTransaction != null ? autoCreateTransaction : false; // Kiểm tra null
	}

	public Instant getCreatedAt() {
		return createdAt != null ? createdAt : Instant.now(); // Đảm bảo không trả về null
	}

	public void setCreatedAt(Instant createdAt) {
		this.createdAt = createdAt != null ? createdAt : Instant.now(); // Kiểm tra null
	}

	public LocalDate getNextDueDate() {
		return nextDueDate;
	}

	public void setNextDueDate(LocalDate nextDueDate) {
		this.nextDueDate = nextDueDate;
	}
}