package com.javaweb.model.request;

import java.time.Instant;
import java.time.LocalDate;

import com.javaweb.enums.RecurringStatusEnum;
import com.javaweb.enums.RecurringTypeEnum;

public class RecurringTransactionRequestDTO {
	
	private String name;
	private Instant createAt = Instant.now();
	private String recurrenceType;
	private RecurringStatusEnum status = RecurringStatusEnum.ACTIVE;
    private LocalDate nextDueDate;

    public RecurringTransactionRequestDTO() {
    }

	public RecurringTransactionRequestDTO(String name, Instant createAt, String recurrenceType,
			RecurringStatusEnum status, LocalDate nextDueDate) {
		super();
		this.name = name;
		this.createAt = createAt;
		this.recurrenceType = recurrenceType;
		this.status = status;
		this.nextDueDate = nextDueDate;
	}

	public String getRecurrenceType() {
		return recurrenceType;
	}

	public void setRecurrenceType(String recurrenceType) {
		this.recurrenceType = recurrenceType;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Instant getCreateAt() {
		return createAt;
	}

	public void setCreateAt(Instant createAt) {
		this.createAt = createAt;
	}



	public RecurringStatusEnum getStatus() {
		return status;
	}

	public void setStatus(RecurringStatusEnum status) {
		this.status = status;
	}

	public LocalDate getNextDueDate() {
		return nextDueDate;
	}

	public void setNextDueDate(LocalDate nextDueDate) {
		this.nextDueDate = nextDueDate;
	}
    
	
    
    
    
    
}
