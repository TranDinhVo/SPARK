package com.javaweb.model;

import java.time.LocalDate;
import com.javaweb.enums.RecurringStatusEnum;
import com.javaweb.enums.RecurringTypeEnum;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class RecurringTransactionDTO {
    private Long id;
    private Long transactionId;
    private RecurringTypeEnum recurrenceType;
    private LocalDate nextDueDate;
    private RecurringStatusEnum status;
}