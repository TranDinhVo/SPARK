package com.javaweb.model.request;
import java.math.BigDecimal;
import java.time.Instant;
import java.time.LocalDate;
import com.javaweb.enums.RecurringStatusEnum;
import com.javaweb.enums.RecurringTypeEnum;
public class RecurringTransactionRequestDTO {

    private String name;
    private Instant createAt = Instant.now();
//    private Instant createAt;
    private String recurrenceType;
    private RecurringStatusEnum status = RecurringStatusEnum.ACTIVE;
    private LocalDate nextDueDate;
    private Long userId; // Thêm trường này
    private BigDecimal amount;
    private Boolean autoCreateTransaction;
    private Long categoryRecurringTransaction;
    
    public RecurringTransactionRequestDTO() {
    	
    }
    
	public RecurringTransactionRequestDTO(String name, Instant createAt, String recurrenceType,
			RecurringStatusEnum status, LocalDate nextDueDate, Long userId, BigDecimal amount,
			Boolean autoCreateTransaction, Long categoryRecurringTransaction) {
		super();
		this.name = name;
		this.createAt = createAt;
		this.recurrenceType = recurrenceType;
		this.status = status;
		this.nextDueDate = nextDueDate;
		this.userId = userId;
		this.amount = amount;
		this.autoCreateTransaction = autoCreateTransaction;
		this.categoryRecurringTransaction = categoryRecurringTransaction;
	}
	

	public Long getCategoryRecurringTransaction() {
		return categoryRecurringTransaction;
	}

	public void setCategoryRecurringTransaction(Long categoryRecurringTransaction) {
		this.categoryRecurringTransaction = categoryRecurringTransaction;
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

	public String getRecurrenceType() {
		return recurrenceType;
	}

	public void setRecurrenceType(String recurrenceType) {
		this.recurrenceType = recurrenceType;
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

	public Long getUserId() {
		return userId;
	}

	public void setUserId(Long userId) {
		this.userId = userId;
	}

	public BigDecimal getAmount() {
		return amount;
	}

	public void setAmount(BigDecimal amount) {
		this.amount = amount;
	}

	public Boolean getAutoCreateTransaction() {
		return autoCreateTransaction;
	}

	public void setAutoCreateTransaction(Boolean autoCreateTransaction) {
		this.autoCreateTransaction = autoCreateTransaction;
	}
}