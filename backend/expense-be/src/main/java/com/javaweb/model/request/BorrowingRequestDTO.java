package com.javaweb.model.request;

import java.math.BigDecimal;
import java.time.Instant;

public class BorrowingRequestDTO {
	private Long id;
	private Long userId;
	private String counterpartyName;
    private BigDecimal amountLoan;
    private BigDecimal amount; // Nguoi dung kh nhap
    private BigDecimal interestRate;
    private Long times;
    private Instant createdAt;
    private String loanType;
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
	public String getCounterpartyName() {
		return counterpartyName;
	}
	public void setCounterpartyName(String counterpartyName) {
		this.counterpartyName = counterpartyName;
	}
	public BigDecimal getAmountLoan() {
		return amountLoan;
	}
	public void setAmountLoan(BigDecimal amountLoan) {
		this.amountLoan = amountLoan;
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
	public Long getTimes() {
		return times;
	}
	public void setTimes(Long times) {
		this.times = times;
	}
	public Instant getCreatedAt() {
		return createdAt;
	}
	public void setCreatedAt(Instant createdAt) {
		this.createdAt = createdAt;
	}
	public String getLoanType() {
		return loanType;
	}
	public void setLoanType(String loanType) {
		this.loanType = loanType;
	}
    
    
}
