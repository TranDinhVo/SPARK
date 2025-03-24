package com.javaweb.entity;

import java.math.BigDecimal;
import java.time.Instant;

import com.javaweb.enums.TransactionTypeEnum;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
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

    @Column(name = "amount", precision = 15, scale = 2, nullable = false)
    private BigDecimal amount;

    @Enumerated(EnumType.STRING)
    @Column(name = "type", nullable = false, length = 10)
    private TransactionTypeEnum type;

    @Column(name = "description", columnDefinition = "TEXT")
    private String description;

    @Column(name = "is_recurring")
    private Boolean isRecurring = false;

    @Column(name = "status")
    private Boolean status = true;

    @Column(name = "created_at", updatable = false)
    private Instant createdAt = Instant.now();
}
