package com.javaweb.Builder;

import java.math.BigDecimal;
import java.time.Instant;

import com.javaweb.entity.UserEntity;
import com.javaweb.enums.BorrowingStatusEnum;
import com.javaweb.enums.LoanTypeEnum;

public class BorrowingSearchBuilder {
	private Long id;
	private String counterparty_name;
    private BigDecimal amount_from;
    private BigDecimal amount_to;
    private BigDecimal interest_rate;
    private Instant deadline;
    private LoanTypeEnum loan_type;
    private BorrowingStatusEnum status;
    private Instant created_at;
    private Long user_id;
    
    public BorrowingSearchBuilder(Builder builder) {
		this.counterparty_name = builder.counterparty_name;
		this.amount_from = builder.amount_from;
		this.amount_to = builder.amount_to;
		this.interest_rate = builder.interest_rate;
		this.deadline = builder.deadline;
		this.loan_type = builder.loan_type;
		this.status = builder.status;
		this.created_at = builder.created_at;
		this.user_id = builder.user_id;
	}
    
    public Long getUserId() {
		return user_id;
	}

	public Long getId() {
		return id;
	}

	public Instant getCreatedAt() {
		return created_at;
	}

	public String getCounterpartyName() {
    	return counterparty_name;
    }
    
    public BigDecimal getAmountFrom() {
    	return amount_from;
    }
    public BigDecimal getAmountTo() {
    	return amount_to;
    }
    
    public BigDecimal getInterestRate() {
    	return interest_rate;
    }
    
    public Instant getDeadline() {
    	return deadline;
    }
    
    public LoanTypeEnum getLoanType() {
    	return loan_type;
    }
    
    public BorrowingStatusEnum getStatus() {
    	return status;
    }
    
    public Instant getCreated_at() {
    	return created_at;
    }
    public static class Builder{
    	private Long id;
		private String counterparty_name;
		private BigDecimal amount_from;
	    private BigDecimal amount_to;
        private BigDecimal interest_rate;
        private Instant deadline;
        private LoanTypeEnum loan_type;
        private BorrowingStatusEnum status;
        private Instant created_at;
        private Long user_id;
        
        public Builder setId(Long id) {
			this.id = id;
			return this;
		}
		public Builder setUserId(Long userId) {
			this.user_id = userId;
			return this;
		}
		public Builder setCounterpartyName(String counterpartyName) {
        	this.counterparty_name = counterpartyName;
        	return this;
        }
        public Builder setAmountFrom(BigDecimal amountFrom) {
        	this.amount_from = amountFrom;
        	return this;
        }
        public Builder setAmountTo(BigDecimal amountTo) {
        	this.amount_to = amountTo;
        	return this;
        }
        public Builder setInterestRate(BigDecimal interestRate) {
        	this.interest_rate = interestRate;
        	return this;
        }
        public Builder setDeadline(Instant deadline) {
        	this.deadline = deadline;
        	return this;
        }
        public Builder setLoanType(LoanTypeEnum loanType) {
        	this.loan_type = loanType;
        	return this;
        }
        public Builder setStatus(BorrowingStatusEnum status) {
        	this.status = status;
        	return this;
        }
        public Builder setCreatedAt(Instant createdAt) {
        	this.created_at = createdAt;
        	return this;
        }
        
      //phương thức trả về đối tượng 
        public BorrowingSearchBuilder build() {
       	 return new BorrowingSearchBuilder(this);
        }
    }
	
}
