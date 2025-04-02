package com.javaweb.model;


import java.math.BigDecimal;
import java.time.Instant;

import com.javaweb.enums.TransactionTypeEnum;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class TransactionDTO {

    private Long id;
    private Long userId;
    private Long walletId;
    private Long goalId;
    private Long borrowingId;
    private Long categoryId;
    private BigDecimal amount;
    private TransactionTypeEnum type;
    private String description;
    private Boolean isRecurring;
    private Boolean status;
    private Instant createdAt;
}
