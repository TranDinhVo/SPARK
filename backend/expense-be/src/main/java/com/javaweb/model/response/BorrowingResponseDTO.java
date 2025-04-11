package com.javaweb.model.response;

import java.math.BigDecimal;
import java.time.Instant;
import java.time.LocalDate;

import com.javaweb.enums.BorrowingStatusEnum;
import com.javaweb.enums.LoanTypeEnum;
public class BorrowingResponseDTO {
	//Trả borrow
	private Long id;//khóa chính
	private String counterpartyName;//tên đối tác
    private BigDecimal amountLoan;//số tiền mượn
    private BigDecimal interestRate;//lãi
    private Long remainTimes; // số lần còn lại
    private Long times;
    private LoanTypeEnum loanType;//kiểu mượn
    private BorrowingStatusEnum status;//tình trạng
    private Instant createdAt;
    private LocalDate nextDueDate;
    private BigDecimal paidAmount;//tiền đã trả
    
	public BorrowingResponseDTO() {} 
	public BorrowingResponseDTO(Long id, String counterpartyName, BigDecimal amountLoan, BigDecimal interestRate,
			Long remainTimes, Long times, LoanTypeEnum loanType, BorrowingStatusEnum status, Instant createdAt, LocalDate nextDueDate,
			BigDecimal paidAmount) {
		super();
		this.id = id;
		this.counterpartyName = counterpartyName;
		this.amountLoan = amountLoan;
		this.interestRate = interestRate;
		this.remainTimes = remainTimes;
		this.loanType = loanType;
		this.status = status;
		this.createdAt = createdAt;
		this.nextDueDate = nextDueDate;
		this.paidAmount = paidAmount;
		this.times = times;
		
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
	public void setCounterpartyName(String counterpartyName) {
		this.counterpartyName = counterpartyName;
	}
	public BigDecimal getAmountLoan() {
		return amountLoan;
	}
	public void setAmountLoan(BigDecimal amountLoan) {
		this.amountLoan = amountLoan;
	}
	public BigDecimal getInterestRate() {
		return interestRate;
	}
	public void setInterestRate(BigDecimal interestRate) {
		this.interestRate = interestRate;
	}
	public Long getRemainTimes() {
		return remainTimes;
	}
	public void setRemainTimes(Long remainTimes) {
		this.remainTimes = remainTimes;
	}
	public Long getTimes() {
		return times;
	}
	public void setTimes(Long times) {
		this.times = times;
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
	public LocalDate getNextDueDate() {
		return nextDueDate;
	}
	public void setNextDueDate(LocalDate nextDueDate) {
		this.nextDueDate = nextDueDate;
	}
	public BigDecimal getPaidAmount() {
		return paidAmount;
	}
	public void setPaidAmount(BigDecimal paidAmount) {
		this.paidAmount = paidAmount;
	}
	
}
