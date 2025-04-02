package com.javaweb.entity;

import java.math.BigDecimal;
import java.time.Instant;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
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
@Table(name = "transaction")
public class TransactionEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private UserEntity userTransaction;

    @ManyToOne
    @JoinColumn(name = "wallet_id", nullable = false)
    private WalletEntity walletTransaction;

    @ManyToOne
    @JoinColumn(name = "goal_id")
    private GoalEntity goalTransaction;

    @ManyToOne
    @JoinColumn(name = "borrowing_id")
    private BorrowingEntity borrowingTransaction;

    @ManyToOne
    @JoinColumn(name = "category_id", nullable = false)
    private CategoryEntity categoryTransaction;

    @OneToOne
    @JoinColumn(name = "recurring_id", nullable = false)
    private RecurringTransactionEntity recurrence;
    
    @Column(name = "amount", precision = 15, scale = 2, nullable = false)
    private BigDecimal amount;

    @Column(name = "description", columnDefinition = "TEXT")
    private String description;

   
    @Column(name = "status")
    private Boolean status = true;

    @Column(name = "created_at", updatable = false)
    private Instant createdAt = Instant.now();
    
}
