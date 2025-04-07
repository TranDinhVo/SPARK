package com.javaweb.Builder;

import java.math.BigDecimal;
import java.time.Instant;

public class GoalSearchBuilder {
	private Long id;
	private Long user_id;
    private String goal_name;
    private BigDecimal amount_from;
    private BigDecimal amount_to;
    private Instant start_at;
    private Instant end_at;
    
	public GoalSearchBuilder(Builder builder) {
		this.id = builder.id;
		this.user_id = builder.user_id;
		this.goal_name = builder.goal_name;
		this.amount_from = builder.amount_from;
		this.amount_to = builder.amount_to;
		this.start_at = builder.start_at;
		this.end_at = builder.end_at;
	}
    public Long getId() {
		return id;
	}

	public Long getUser_id() {
		return user_id;
	}

	public String getGoal_name() {
		return goal_name;
	}

	public BigDecimal getAmount_from() {
		return amount_from;
	}

	public BigDecimal getAmount_to() {
		return amount_to;
	}

	public Instant getStart_at() {
		return start_at;
	}

	public Instant getEnd_at() {
		return end_at;
	}

	public static class Builder {
    	private Long id;
    	private Long user_id;
        private String goal_name;
        private BigDecimal amount_from;
        private BigDecimal amount_to;
        private Instant start_at;
        private Instant end_at;
        
		
        public Builder setId(Long id) {
			this.id = id;
			return this;
		}


		public Builder setUser_id(Long user_id) {
			this.user_id = user_id;
			return this;
		}


		public Builder setGoal_name(String goal_name) {
			this.goal_name = goal_name;
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


		public Builder setStart_at(Instant start_at) {
			this.start_at = start_at;
			return this;
		}


		public Builder setEnd_at(Instant end_at) {
			this.end_at = end_at;
			return this;
		}


		public GoalSearchBuilder build() {
        	return new GoalSearchBuilder(this);
        }
    }
}
