package com.javaweb.Builder;

import java.math.BigDecimal;
import java.time.Instant;
import java.time.LocalDate;

import com.javaweb.enums.BorrowingStatusEnum;
import com.javaweb.enums.LoanTypeEnum;

public class BorrowingSearchBuilder {
	//Nhận thông tin (tìm/lấy) mượn
	private Long id;
	private Long user_id;
	private String counterparty_name;
    private BigDecimal amount_from;
    private BigDecimal amount_to;
    private BigDecimal interest_rate;
    private LoanTypeEnum loan_type;
    private Instant created_at;
    private LocalDate next_due_date;
    private BorrowingStatusEnum status;
    
    public BorrowingSearchBuilder(Builder builder) {
    	this.id = builder.id;
    	this.user_id = builder.user_id;
		this.counterparty_name = builder.counterparty_name;
		this.amount_from = builder.amount_from;
		this.amount_to = builder.amount_to;
		this.interest_rate = builder.interest_rate;
		this.loan_type = builder.loan_type;
		this.created_at = builder.created_at;
		this.next_due_date = builder.next_due_date;
		this.status = builder.status;
	}
    
    
    public LocalDate getNext_due_date() {
		return next_due_date;
	}
    
	public Long getId() {
		return id;
	}

	public Long getUser_id() {
		return user_id;
	}

	public String getCounterparty_name() {
		return counterparty_name;
	}

	public BigDecimal getAmount_from() {
		return amount_from;
	}

	public BigDecimal getAmount_to() {
		return amount_to;
	}

	public BigDecimal getInterest_rate() {
		return interest_rate;
	}

	public LoanTypeEnum getLoan_type() {
		return loan_type;
	}

	public Instant getCreated_at() {
		return created_at;
	}

	public BorrowingStatusEnum getStatus() {
		return status;
	}

	public static class Builder{
    	private Long id;
    	private Long user_id;
    	private String counterparty_name;
        private BigDecimal amount_from;
        private BigDecimal amount_to;
        private BigDecimal interest_rate;
        private LoanTypeEnum loan_type;
        private Instant created_at;
        private LocalDate next_due_date;
        private BorrowingStatusEnum status;
        
      public Builder setId(Long id) {
			this.id = id;
			return this;
		}

		public Builder setUser_id(Long user_id) {
			this.user_id = user_id;
			return this;
		}

		public Builder setCounterparty_name(String counterparty_name) {
			this.counterparty_name = counterparty_name;
			return this;
		}

		public Builder setAmount_from(BigDecimal amount_from) {
			this.amount_from = amount_from;
			return this;
		}

		public Builder setAmount_to(BigDecimal amount_to) {
			this.amount_to = amount_to;
			return this;
		}

		public Builder setInterest_rate(BigDecimal interest_rate) {
			this.interest_rate = interest_rate;
			return this;
		}

		public Builder setLoan_type(LoanTypeEnum loan_type) {
			this.loan_type = loan_type;
			return this;
		}

		public Builder setCreated_at(Instant created_at) {
			this.created_at = created_at;
			return this;
		}

		public Builder setStatus(BorrowingStatusEnum status) {
			this.status = status;
			return this;
		}

		public Builder setNext_due_date(LocalDate next_due_date) {
			this.next_due_date = next_due_date;
			return this;
		}


		//phương thức trả về đối tượng 
        public BorrowingSearchBuilder build() {
       	 return new BorrowingSearchBuilder(this);
        }
    }
	
}
