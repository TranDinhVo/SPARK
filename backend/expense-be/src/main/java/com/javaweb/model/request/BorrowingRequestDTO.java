package com.javaweb.model.request;

import java.math.BigDecimal;
import java.time.Instant;

import com.javaweb.enums.BorrowingStatusEnum;
import com.javaweb.enums.LoanTypeEnum;

public class BorrowingRequestDTO {
	private Long id;
	private Long userId;
	private Long walletId;
	private String counterpartyName;
    private BigDecimal amount;
    private BigDecimal interestRate;
    private Instant deadline;
    private Instant createdAt;
    private String loanType;
    
	public String getLoanType() {
		return loanType;
	}
	public void setLoanType(String loanType) {
		this.loanType = loanType;
	}
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public Long getWalletId() {
		return walletId;
	}
	public void setWalletId(Long walletId) {
		this.walletId = walletId;
	}
	public Long getUserId() {
		return userId;
	}
	public void setUserId(Long userId) {
		this.userId = userId;
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
//	public LoanTypeEnum getLoanType() {
//		return loanType;
//	}
//	public void setLoanType(LoanTypeEnum loanType) {
//		this.loanType = loanType;
//	}
	public Instant getCreatedAt() {
		return createdAt;
	}
	public void setCreatedAt(Instant createdAt) {
		this.createdAt = createdAt;
	}
}
