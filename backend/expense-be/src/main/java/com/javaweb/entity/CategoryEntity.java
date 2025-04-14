package com.javaweb.entity;

import java.time.Instant;
import java.util.ArrayList;
import java.util.List;

import com.javaweb.enums.CategoryTypeEnum;

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
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "category")
public class CategoryEntity {

   
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
	
	@ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private UserEntity userCategory;
	
    @OneToMany(mappedBy = "categoryTransaction", fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
    private List<TransactionEntity> transaction  = new ArrayList<>();
    
    @OneToMany(mappedBy = "categoryBudget", fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
    private List<BudgetEntity> budget  = new ArrayList<>();
    
    @Enumerated(EnumType.STRING)
    @Column(name="type", nullable = false, length= 100)
    private CategoryTypeEnum type;
    
	@Column(name="name",nullable = false, length = 100)
    private String name;

    @Column(name="icon_url", columnDefinition = "TEXT")
    private String iconUrl;

    @Column (name="color")
    private String color;
    
    @Column(name = "created_at", updatable = false)
    private Instant createdAt = Instant.now();

    
    
    
	public CategoryEntity() {
		
	}

	public CategoryEntity(Long id, UserEntity userCategory, List<TransactionEntity> transaction,
			List<BudgetEntity> budget, CategoryTypeEnum type, String name, String iconUrl, String color,
			Instant createdAt) {
		super();
		this.id = id;
		this.userCategory = userCategory;
		this.transaction = transaction;
		this.budget = budget;
		this.type = type;
		this.name = name;
		this.iconUrl = iconUrl;
		this.color = color;
		this.createdAt = createdAt;
	}









	public Long getId() {
		return id;
	}




	public void setId(Long id) {
		this.id = id;
	}




	public UserEntity getUserCategory() {
		return userCategory;
	}




	public void setUserCategory(UserEntity userCategory) {
		this.userCategory = userCategory;
	}




	public List<TransactionEntity> getTransaction() {
		return transaction;
	}




	public void setTransaction(List<TransactionEntity> transaction) {
		this.transaction = transaction;
	}




	public List<BudgetEntity> getBudget() {
		return budget;
	}




	public void setBudget(List<BudgetEntity> budget) {
		this.budget = budget;
	}




	public CategoryTypeEnum getType() {
		return type;
	}




	public void setType(CategoryTypeEnum type) {
		this.type = type;
	}




	public String getName() {
		return name;
	}




	public void setName(String name) {
		this.name = name;
	}




	public String getIconUrl() {
		return iconUrl;
	}




	public void setIconUrl(String iconUrl) {
		this.iconUrl = iconUrl;
	}




	public String getColor() {
		return color;
	}




	public void setColor(String color) {
		this.color = color;
	}




	public Instant getCreatedAt() {
		return createdAt;
	}




	public void setCreatedAt(Instant createdAt) {
		this.createdAt = createdAt;
	}

	
}
