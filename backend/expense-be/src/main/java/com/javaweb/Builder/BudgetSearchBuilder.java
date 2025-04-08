package com.javaweb.Builder;

import java.math.BigDecimal;
import java.time.Instant;
import java.time.LocalDate;

public class BudgetSearchBuilder {
	private Long id;
    private Long user_id;
    private Long category_id;
    private BigDecimal amount_from;
    private BigDecimal amount_to;
    private Instant start_date;
    private Instant end_date;
    
    public Long getId() {
		return id;
	}

	public Long getUser_id() {
		return user_id;
	}

	public Long getCategory_id() {
		return category_id;
	}

	public BigDecimal getAmount_from() {
		return amount_from;
	}

	public BigDecimal getAmount_to() {
		return amount_to;
	}

	public Instant getStart_date() {
		return start_date;
	}

	public Instant getEnd_date() {
		return end_date;
	}
	
	public BudgetSearchBuilder() {
		super();
	}
	
	public BudgetSearchBuilder(Builder builder) {
		this.id = builder.id;
		this.user_id = builder.user_id;
		this.category_id = builder.category_id;
		this.amount_from = builder.amount_from;
		this.amount_to = builder.amount_to;
		this.start_date = builder.start_date;
		this.end_date = builder.end_date;
	}

	public static class Builder{
    	private Long id;
        private Long user_id;
        private Long category_id;
        private BigDecimal amount_from;
        private BigDecimal amount_to;
        private Instant start_date;
        private Instant end_date;
        
		public Builder setId(Long id) {
			this.id = id;
			return this;
		}
		public Builder setUser_id(Long user_id) {
			this.user_id = user_id;
			return this;
		}
		public Builder setCategory_id(Long category_id) {
			this.category_id = category_id;
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
		public Builder setStart_date(Instant start_date) {
			this.start_date = start_date;
			return this;
		}
		public Builder setEnd_date(Instant end_date) {
			this.end_date = end_date;
			return this;
		}
        public BudgetSearchBuilder build() {
        	return new BudgetSearchBuilder(this);
        }
    }
}
