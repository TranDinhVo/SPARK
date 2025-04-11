//package com.javaweb.model.dto;
//
//import java.math.BigDecimal;//chưa thấy dùng
//import java.time.Instant;
//
//import com.javaweb.entity.UserEntity;
//import com.javaweb.enums.BorrowingStatusEnum;
//import com.javaweb.enums.LoanTypeEnum;
//
//public class BorrowingDTO {
//    private Long id;
//    private String counterpartyName;
//    private BigDecimal amount;
//    private BigDecimal interestRate = BigDecimal.ZERO;
//    private Instant deadline;
//    private LoanTypeEnum loanType;
//    private BorrowingStatusEnum status;
//    private BigDecimal paidAmount;
//    private Instant createAt;
//    
//    
//	public BigDecimal getPaidAmount() {
//		return paidAmount;
//	}
//
//	public void setPaidAmount(BigDecimal paidAmount) {
//		this.paidAmount = paidAmount;
//	}
//
//	public Instant getCreateAt() {
//		return createAt;
//	}
//
//	public void setCreateAt(Instant createAt) {
//		this.createAt = createAt;
//	}
//
//	public Long getId() {
//		return id;
//	}
//	
//	public void setId(Long id) {
//		this.id = id;
//	}
//	
//	public String getCounterpartyName() {
//		return counterpartyName;
//	}
//	
//	public void setCounterpartyName(String counterpartyName) {
//		this.counterpartyName = counterpartyName;
//	}
//	
//	public BigDecimal getAmount() {
//		return amount;
//	}
//	
//	public void setAmount(BigDecimal amount) {
//		this.amount = amount;
//	}
//	
//	public BigDecimal getInterestRate() {
//		return interestRate;
//	}
//	
//	public void setInterestRate(BigDecimal interestRate) {
//		this.interestRate = interestRate;
//	}
//	
//	public Instant getDeadline() {
//		return deadline;
//	}
//	
//	public void setDeadline(Instant deadline) {
//		this.deadline = deadline;
//	}
//	
//	public LoanTypeEnum getLoanType() {
//		return loanType;
//	}
//	
//	public void setLoanType(LoanTypeEnum loanType) {
//		this.loanType = loanType;
//	}
//	
//	public BorrowingStatusEnum getStatus() {
//		return status;
//	}
//	
//	public void setStatus(BorrowingStatusEnum status) {
//		this.status = status;
//	}
//
//}
