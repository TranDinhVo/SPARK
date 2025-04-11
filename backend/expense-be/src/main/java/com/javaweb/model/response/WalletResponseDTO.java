package com.javaweb.model.response;

import java.math.BigDecimal;

import com.javaweb.enums.CurrencyEnum;

public class WalletResponseDTO {
	private Long id;
    private String name;
    private BigDecimal balance;
    private CurrencyEnum currency;
    
    public WalletResponseDTO() {}
	public WalletResponseDTO(Long id, String name, BigDecimal balance, CurrencyEnum currency) {
		super();
		this.id = id;
		this.name = name;
		this.balance = balance;
		this.currency = currency;
	}
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
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
}
