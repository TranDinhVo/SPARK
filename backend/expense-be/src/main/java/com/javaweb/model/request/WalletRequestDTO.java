package com.javaweb.model.request;

import java.math.BigDecimal;

import com.javaweb.enums.CurrencyEnum;

public class WalletRequestDTO {
	private String name;
    private BigDecimal balance;
    private CurrencyEnum currency = CurrencyEnum.VND;
    private Long userId;
    
    public WalletRequestDTO() {}
    
	public WalletRequestDTO(String name, BigDecimal balance, CurrencyEnum currency, Long userId) {
		super();
		this.name = name;
		this.balance = balance;
		this.currency = currency;
		this.userId = userId;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public BigDecimal getBalance() {
		return balance;
	}
	public void setBalance(BigDecimal balance) {
		this.balance = balance;
	}
	public CurrencyEnum getCurrency() {
		return currency;
	}
	public void setCurrency(CurrencyEnum currency) {
		this.currency = currency;
	}
	public Long getUserId() {
		return userId;
	}
	public void setUserId(Long userId) {
		this.userId = userId;
	}
    
    
    
    
}
