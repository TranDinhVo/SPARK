package com.javaweb.model.response;

import java.math.BigDecimal;
import java.time.Instant;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.javaweb.enums.BorrowingStatusEnum;
import com.javaweb.enums.LoanTypeEnum;
public class BorrowingResponseDTO {
	private Long id;
	private String counterpartyName;
    private BigDecimal amount;
    private BigDecimal interestRate;
    private Instant deadline;
    private LoanTypeEnum loanType;
    private BorrowingStatusEnum status;
    private Instant createdAt;
    private Long userId;
    private BigDecimal paidAmount;
    
    public BorrowingResponseDTO(BigDecimal amount, BigDecimal interestRate, Instant createdAt, Instant deadline, 
            Long id, Long userId, Long walletId, String counterpartyName, 
            String loanType, String status, BigDecimal paidAmount) {
        this.amount = amount;
        this.interestRate = interestRate;
        this.createdAt = createdAt;
        this.deadline = deadline;
        this.id = id;
        this.userId = userId;
        this.counterpartyName = counterpartyName;
        this.loanType = LoanTypeEnum.valueOf(loanType);
        this.status = BorrowingStatusEnum.valueOf(status);
        this.paidAmount = paidAmount;
    }
    
	public BorrowingResponseDTO() {
		super();
	}


	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getCounterpartyName() {
		return counterpartyName;
	}
	public void setCounterpartyName(String counterparty_name) {
		this.counterpartyName = counterparty_name;
	}
	public BigDecimal getAmount() {
		return amount;
	}
	public void setAmount(BigDecimal amount) {
		this.amount = amount;
	}
	public BigDecimal getInterest_rate() {
		return interestRate;
	}
	public void setInterestRate(BigDecimal interest_rate) {
		this.interestRate = interest_rate;
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
	public void setLoanType(LoanTypeEnum loan_type) {
		this.loanType = loan_type;
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
	public void setCreatedAt(Instant created_at) {
		this.createdAt = created_at;
	}
	public Long getUserId() {
		return userId;
	}
	public void setUserId(Long user_id) {
		this.userId = user_id;
	}
	public BigDecimal getPaidAmount() {
		return paidAmount;
	}
	public void setPaidAmount(BigDecimal paidAmount) {
		this.paidAmount = paidAmount;
	}
    
	
}
