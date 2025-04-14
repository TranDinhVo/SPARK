package com.javaweb.model.response;
import java.time.Instant;
import java.time.LocalDate;
import com.javaweb.model.dto.RecurrenceStatusDTO;
public class RecurringTransactionResponseDTO {
    private Long id;
    private String type;
    private String name;
    private Instant createAt;
    private LocalDate nextDate;
    private RecurrenceStatusDTO status;

     public RecurringTransactionResponseDTO() {
        }
    public RecurringTransactionResponseDTO(Long id, String type, String name, Instant createAt, LocalDate nextDate,
            RecurrenceStatusDTO status) {
        super();
        this.id = id;
        this.type = type;
        this.name = name;
        this.createAt = createAt;
        this.nextDate = nextDate;
        this.status = status;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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

}