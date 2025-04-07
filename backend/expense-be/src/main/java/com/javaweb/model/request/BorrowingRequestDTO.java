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
	public Instant getCreatedAt() {
		return createdAt;
	}
	public void setCreatedAt(Instant createdAt) {
		this.createdAt = createdAt;
	}
	public void validate() {
        if (id == null) {
            throw new IllegalArgumentException("Id chưa được nhập");
        }
        if (amount == null) {
            throw new IllegalArgumentException("Tiền mượn chưa được nhập");
        }
        if(userId == null) {
        	throw new IllegalArgumentException("Id người dùng chưa được nhập");
        }
        if(deadline == null) {
        	throw new IllegalArgumentException("Thời hạn chưa được nhập");
        }
        if(counterpartyName == null) {
        	throw new IllegalArgumentException("Tên đối tác chưa được nhập");
        }
        if(loanType == null) {
        	throw new IllegalArgumentException("Thể loại vay chưa được nhập");
        }
        if(walletId == null) {
        	throw new IllegalArgumentException("Id ví chưa được nhập");
        }
    }
}
