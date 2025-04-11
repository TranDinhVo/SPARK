package com.javaweb.converter;

import java.math.BigDecimal;
import java.time.Instant;
import java.time.LocalDate;
import java.util.Map;

import org.springframework.stereotype.Component;

import com.javaweb.Builder.BorrowingSearchBuilder;
import com.javaweb.Utils.MapUtil;
import com.javaweb.enums.BorrowingStatusEnum;
import com.javaweb.enums.LoanTypeEnum;

@Component
public class BorrowingSearchBuilderConverter {
	public BorrowingSearchBuilder toBorrowingSearchBuilder (Map<String,Object> params) {
		BorrowingSearchBuilder borrowingSearchBuilder = new BorrowingSearchBuilder.Builder()
			.setUser_id(MapUtil.getObject(params, "id", Long.class))
			.setUser_id(MapUtil.getObject(params, "userId", Long.class))
			.setCounterparty_name(MapUtil.getObject(params, "counterpartyName", String.class))
			.setAmount_from(MapUtil.getObject(params, "amountFrom",BigDecimal.class))
			.setAmount_to(MapUtil.getObject(params, "amountTo",BigDecimal.class))
			.setInterest_rate(MapUtil.getObject(params, "interestRate", BigDecimal.class))
			.setLoan_type(MapUtil.getObject(params, "loanType", LoanTypeEnum.class))
			.setStatus(MapUtil.getObject(params, "status", BorrowingStatusEnum.class))
			.setCreated_at(MapUtil.getObject(params, "createdAt", Instant.class))
			.setNext_due_date(MapUtil.getObject(params, "nextDueDate",LocalDate.class))
			.build();
		
	  return borrowingSearchBuilder;
	}
}
