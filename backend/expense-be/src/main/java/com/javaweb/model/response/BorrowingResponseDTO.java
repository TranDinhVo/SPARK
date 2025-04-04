package com.javaweb.model.response;

import java.math.BigDecimal;
import java.time.Instant;

import com.javaweb.enums.BorrowingStatusEnum;
import com.javaweb.enums.LoanTypeEnum;
public class BorrowingResponseDTO {
	//Trả borrow
	private Long id;//khóa chính
	private String walletName;//tên ví
	private String counterpartyName;//tên đối tác
    private BigDecimal amount;//số tiền mượn
    private BigDecimal interestRate;//lãi
    private Instant deadline;
    private LoanTypeEnum loanType;//kiểu mượn
    private BorrowingStatusEnum status;//tình trạng
    private Instant createdAt;
    private BigDecimal paidAmount;//tiền đã trả
    
    public BorrowingResponseDTO(Long id, String walletName, String counterpartyName, BigDecimal amount,
    		BigDecimal interestRate, Instant deadline, String loanType, String status, Instant createdAt,
    		BigDecimal paidAmount) {
    	super();
    	this.id = id;
    	this.walletName = walletName;
    	this.counterpartyName = counterpartyName;
    	this.amount = amount;
    	this.interestRate = interestRate;
    	this.deadline = deadline;
    	this.loanType = LoanTypeEnum.valueOf(loanType);
    	this.status = BorrowingStatusEnum.valueOf(status);
    	this.createdAt = createdAt;
    	this.paidAmount = paidAmount;
    }
    
	public BorrowingResponseDTO() {
		super();
	}
	public String getWalletName() {
		return walletName;
	}
	public void setWalletName(String walletName) {
		this.walletName = walletName;
	}
	public BigDecimal getInterestRate() {
		return interestRate;
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
	public BigDecimal getPaidAmount() {
		return paidAmount;
	}
	public void setPaidAmount(BigDecimal paidAmount) {
		this.paidAmount = paidAmount;
	}
    
	
}
