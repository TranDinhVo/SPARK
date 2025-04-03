package com.javaweb.model;

import java.time.LocalDate;

import com.javaweb.enums.RecurringTypeEnum;

public class RecurringTransactionResponseDTO {   
    
    private RecurringTypeEnum ype;
    private LocalDate nextDate;
    private StatusRecurrenceDTO status;
    


}