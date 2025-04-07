package com.javaweb.model.response;

import java.util.List;

public class LoginResponseDTO {
	private String token;
    private String username;
    private Long id;
    private String fullname;
    private List<String> roles;
    
    
    public LoginResponseDTO() {}
	public LoginResponseDTO(String token, String username, Long id, String fullname, List<String> roles) {
		super();
		this.token = token;
		this.username = username;
		this.id = id;
		this.fullname = fullname;
		this.roles = roles;
	}
	public String getToken() {
		return token;
	}
	public void setToken(String token) {
		this.token = token;
	}
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getFullname() {
		return fullname;
	}
	public void setFullname(String fullname) {
		this.fullname = fullname;
	}
	public List<String> getRoles() {
		return roles;
	}
	public void setRoles(List<String> roles) {
		this.roles = roles;
	}
    
    
    
}
