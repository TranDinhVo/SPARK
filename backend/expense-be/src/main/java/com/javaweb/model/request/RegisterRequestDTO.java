package com.javaweb.model.request;

public class RegisterRequestDTO {
	private String username;
    private String fullname;
    private String password;
    private String email;
    private String phone;
    
	public RegisterRequestDTO() {}
	public RegisterRequestDTO(String username, String fullname, String password, String email, String phone) {
		super();
		this.username = username;
		this.fullname = fullname;
		this.password = password;
		this.email = email;
		this.phone = phone;
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
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
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
    
    
    
}
