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
@Table(name="user")
@Getter
@Setter
@NoArgsConstructor  
@AllArgsConstructor
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
	

}
