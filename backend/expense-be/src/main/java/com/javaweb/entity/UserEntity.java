package com.javaweb.entity;

import java.time.Instant;
import java.util.ArrayList;
import java.util.List;

import com.javaweb.enums.CurrencyEnum;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.OneToMany;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name="user")
public class UserEntity {
	
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	 
	@Column(name ="username", nullable = false, unique = true)
	private String username;
	
	@Column(name ="fullname", nullable = false)
	private String fullname;
	
	@Column(name ="password", nullable = false)
	private String password;
	
	@Column(name ="phone")
	private String phone;
	
	@Column(name ="email", nullable = false, unique = true)
	private String email;
	
	@Column(name ="status", nullable = false)
	private Boolean status = true;
	
	
	@Column(name ="avatar_url", columnDefinition = "TEXT")
	private String avatarUrl;
	
	@Enumerated(EnumType.STRING)
	@Column(name ="currency")
	private CurrencyEnum currency = CurrencyEnum.VND;
	
	@Column(name ="auth_token")
	private String authToken;
	
	@Column(name = "created_at", updatable = false, nullable = false)
    private Instant createdAt = Instant.now();
	
    @PrePersist
    protected void onCreate() {
        this.createdAt = Instant.now();
    }

    @OneToMany(mappedBy = "userWallet", fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
    private List<WalletEntity> wallets = new ArrayList<>();
    
    
    @OneToMany(mappedBy = "userGoal", fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
    private List<GoalEntity> goals  = new ArrayList<>();
    

    @OneToMany(mappedBy = "userBorrowing", fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
    private List<BorrowingEntity> borrowings  = new ArrayList<>();
    
    @OneToMany(mappedBy = "userTransaction", fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
    private List<TransactionEntity> transactions  = new ArrayList<>();
    
    @OneToMany(mappedBy = "userBudget", fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
    private List<BudgetEntity> budget  = new ArrayList<>();
    
    
    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(
        name = "user_role",
        joinColumns = @JoinColumn(name = "userId", nullable = false),
        inverseJoinColumns = @JoinColumn(name = "roleId", nullable = false)
    )
    private List<RoleEntity> roles = new ArrayList<>();

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


	public String getPassword() {
		return password;
	}


	public void setPassword(String password) {
		this.password = password;
	}


	public String getPhone() {
		return phone;
	}


	public void setPhone(String phone) {
		this.phone = phone;
	}


	public String getEmail() {
		return email;
	}


	public void setEmail(String email) {
		this.email = email;
	}


	public Boolean getStatus() {
		return status;
	}


	public void setStatus(Boolean status) {
		this.status = status;
	}


	public String getAvatarUrl() {
		return avatarUrl;
	}


	public void setAvatarUrl(String avatarUrl) {
		this.avatarUrl = avatarUrl;
	}


	public CurrencyEnum getCurrency() {
		return currency;
	}


	public void setCurrency(CurrencyEnum currency) {
		this.currency = currency;
	}


	public String getAuthToken() {
		return authToken;
	}


	public void setAuthToken(String authToken) {
		this.authToken = authToken;
	}


	public Instant getCreatedAt() {
		return createdAt;
	}


	public void setCreatedAt(Instant createdAt) {
		this.createdAt = createdAt;
	}


	public List<WalletEntity> getWallets() {
		return wallets;
	}


	public void setWallets(List<WalletEntity> wallets) {
		this.wallets = wallets;
	}


	public List<GoalEntity> getGoals() {
		return goals;
	}


	public void setGoals(List<GoalEntity> goals) {
		this.goals = goals;
	}


	public List<BorrowingEntity> getBorrowings() {
		return borrowings;
	}


	public void setBorrowings(List<BorrowingEntity> borrowings) {
		this.borrowings = borrowings;
	}


	public List<TransactionEntity> getTransactions() {
		return transactions;
	}


	public void setTransactions(List<TransactionEntity> transactions) {
		this.transactions = transactions;
	}


	public List<BudgetEntity> getBudget() {
		return budget;
	}


	public void setBudget(List<BudgetEntity> budget) {
		this.budget = budget;
	}


	public List<RoleEntity> getRoles() {
		return roles;
	}


	public void setRoles(List<RoleEntity> roles) {
		this.roles = roles;
	}
    
}
