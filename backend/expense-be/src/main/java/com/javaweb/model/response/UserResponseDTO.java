package com.javaweb.model.response;

import java.time.Instant;
import java.util.List;

import com.javaweb.enums.CurrencyEnum;

public class UserResponseDTO {
	
	private Long id;
    private String username;
    private String fullname;
    private String email;
    private String phone;
    private CurrencyEnum currency = CurrencyEnum.VND;
    private Boolean status = true;
    private Instant createdAt;
    private List<String> roles;
    
	public UserResponseDTO() {}
	public UserResponseDTO(Long id, String username, String fullname, String email, String phone,
			CurrencyEnum currency, Boolean status, Instant createdAt, List<String> roles) {
		super();
		this.id = id;
		this.username = username;
		this.fullname = fullname;
		this.email = email;
		this.phone = phone;
		this.currency = currency;
		this.status = status;
		this.createdAt = createdAt;
		this.roles = roles;
	}
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public String getFullname() {
		return fullname;
	}
	public void setFullname(String fullname) {
		this.fullname = fullname;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getPhone() {
		return phone;
	}
	public void setPhone(String phone) {
		this.phone = phone;
	}

	public CurrencyEnum getCurrency() {
		return currency;
	}
	public void setCurrency(CurrencyEnum currency) {
		this.currency = currency;
	}
	public Boolean getStatus() {
		return status;
	}
	public void setStatus(Boolean status) {
		this.status = status;
	}
	public Instant getCreatedAt() {
		return createdAt;
	}
	public void setCreatedAt(Instant createdAt) {
		this.createdAt = createdAt;
	}
	public List<String> getRoles() {
		return roles;
	}
	public void setRoles(List<String> roles) {
		this.roles = roles;
	} 
	
    
    
    
    
}
