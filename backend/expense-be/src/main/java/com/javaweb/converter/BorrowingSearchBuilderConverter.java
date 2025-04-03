package com.javaweb.converter;

import java.math.BigDecimal;
import java.time.Instant;
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
																				.setId(MapUtil.getObject(params, "id", Long.class))
																				.setUserId(MapUtil.getObject(params, "userId", Long.class))
																				.setWalletId(MapUtil.getObject(params, "walletId", Long.class))
																				.setCounterpartyName(MapUtil.getObject(params, "counterpartyName", String.class))
																				.setAmountFrom(MapUtil.getObject(params, "amountFrom",BigDecimal.class))
																				.setWalletName(MapUtil.getObject(params, "walletName",String.class))
																				.setAmountTo(MapUtil.getObject(params, "amountTo",BigDecimal.class))
																				.setInterestRate(MapUtil.getObject(params, "interestRate", BigDecimal.class))
															                    .setDeadline(MapUtil.getObject(params, "deadline", Instant.class))
															                    .setLoanType(MapUtil.getObject(params, "loanType", LoanTypeEnum.class))
															                    .setStatus(MapUtil.getObject(params, "status", BorrowingStatusEnum.class))
															                    .setCreatedAt(MapUtil.getObject(params, "createdAt", Instant.class))
															                    .build();
		
	  return borrowingSearchBuilder;
	}
}
