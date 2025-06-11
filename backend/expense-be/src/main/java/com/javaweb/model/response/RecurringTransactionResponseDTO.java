package com.javaweb.model.response;
import java.math.BigDecimal;
import java.time.Instant;
import java.time.LocalDate;
import com.javaweb.model.dto.RecurrenceStatusDTO;
public class RecurringTransactionResponseDTO {
    private Long id;
    private Long userId;
    private Long categoryId;
    private String name;
    private BigDecimal amount;
    private String type;
    private Instant createAt;
    private LocalDate nextDate;
    private RecurrenceStatusDTO status;
    private Boolean autoCreateTransaction;
    public RecurringTransactionResponseDTO() {
        }
    public RecurringTransactionResponseDTO(Long id, Long userId, Long categoryId, String name, BigDecimal amount,
			String type, Instant createAt, LocalDate nextDate, RecurrenceStatusDTO status,
			Boolean autoCreateTransaction) {
		super();
		this.id = id;
		this.userId = userId;
		this.categoryId = categoryId;
		this.name = name;
		this.amount = amount;
		this.type = type;
		this.createAt = createAt;
		this.nextDate = nextDate;
		this.status = status;
		this.autoCreateTransaction = autoCreateTransaction;
	}
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public Long getUserId() {
		return userId;
	}
	public void setUserId(Long userId) {
		this.userId = userId;
	}
	public Long getCategoryId() {
		return categoryId;
	}
	public void setCategoryId(Long categoryId) {
		this.categoryId = categoryId;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public BigDecimal getAmount() {
		return amount;
	}
	public void setAmount(BigDecimal amount) {
		this.amount = amount;
	}
	public String getType() {
		return type;
	}
	public void setType(String type) {
		this.type = type;
	}
	public Instant getCreateAt() {
		return createAt;
	}
	public void setCreateAt(Instant createAt) {
		this.createAt = createAt;
	}
	public LocalDate getNextDate() {
		return nextDate;
	}
	public void setNextDate(LocalDate nextDate) {
		this.nextDate = nextDate;
	}
	public RecurrenceStatusDTO getStatus() {
		return status;
	}
	public void setStatus(RecurrenceStatusDTO status) {
		this.status = status;
	}
	public Boolean getAutoCreateTransaction() {
		return autoCreateTransaction;
	}
	public void setAutoCreateTransaction(Boolean autoCreateTransaction) {
		this.autoCreateTransaction = autoCreateTransaction;
	}
	
}