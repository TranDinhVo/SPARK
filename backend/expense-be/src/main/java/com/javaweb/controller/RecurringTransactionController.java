package com.javaweb.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.javaweb.enums.RecurringStatusEnum;
import com.javaweb.model.request.RecurringStatusRequestDTO;
import com.javaweb.model.request.RecurringTransactionRequestDTO;
import com.javaweb.model.response.RecurringTransactionResponseDTO;
import com.javaweb.service.RecurringTransactionService;

@RestController
@RequestMapping("/api/recurring-transactions")
public class RecurringTransactionController {

    @Autowired
    private RecurringTransactionService recurringTransactionService;

    // Lấy tất cả giao dịch định kì
    @GetMapping
    public ResponseEntity<List<RecurringTransactionResponseDTO>> getAllRecurringTransactions() {
        List<RecurringTransactionResponseDTO> transactions = recurringTransactionService.getAllRecurringTransaction();
        return new ResponseEntity<>(transactions, HttpStatus.OK);
    }

    // Lấy giao dịch định kì theo ID
    @GetMapping("/{id}")
    public ResponseEntity<RecurringTransactionResponseDTO> getRecurringTransactionById(@PathVariable Long id) {
        RecurringTransactionResponseDTO transaction = recurringTransactionService.getRecurringTransactionById(id);
        return new ResponseEntity<>(transaction, HttpStatus.OK);
    }

    // Tạo mới giao dịch định kì
    @PostMapping
    public ResponseEntity<RecurringTransactionResponseDTO> createRecurringTransaction(
            @RequestBody RecurringTransactionRequestDTO recurringTransactionRequestDTO) {
        RecurringTransactionResponseDTO createdTransaction = recurringTransactionService.createRecurringTransaction(recurringTransactionRequestDTO);
        return new ResponseEntity<>(createdTransaction, HttpStatus.CREATED);
    }

 // Cập nhật giao dịch định kì
    @PatchMapping("/{id}")
    public ResponseEntity<RecurringTransactionResponseDTO> updateRecurringTransaction(
            @PathVariable Long id,
            @RequestBody RecurringTransactionRequestDTO recurringTransactionRequestDTO) {
        RecurringTransactionResponseDTO updatedTransaction = recurringTransactionService.updateRecurringTransaction(id, recurringTransactionRequestDTO);
        return new ResponseEntity<>(updatedTransaction, HttpStatus.OK);
    }
//
    @PatchMapping("/{id}/status")
    public ResponseEntity<?> updateRecurringTransactionStatus(
            @PathVariable Long id,
            @RequestBody RecurringStatusRequestDTO statusRequest) {
        try {
            // Kiểm tra và chuyển đổi status từ body request
            String status = statusRequest.getStatus();
            
            // Kiểm tra nếu status không null và tồn tại trong enum
            if (status == null || status.isEmpty()) {
                return new ResponseEntity<>("Trạng thái không được để trống", HttpStatus.BAD_REQUEST);
            }

            RecurringStatusEnum recurringStatus;
            try {
                recurringStatus = RecurringStatusEnum.valueOf(status.toUpperCase());
            } catch (IllegalArgumentException e) {
                return new ResponseEntity<>("Trạng thái không hợp lệ: " + status, HttpStatus.BAD_REQUEST);
            }

            RecurringTransactionResponseDTO updatedTransaction = recurringTransactionService.updateRecurringTransactionStatus(id, recurringStatus);
            return new ResponseEntity<>(updatedTransaction, HttpStatus.OK);
        } catch (Exception e) {
            // Log lỗi chi tiết
            e.printStackTrace();
            return new ResponseEntity<>("Có lỗi xảy ra trong quá trình cập nhật trạng thái.", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // Xóa giao dịch định kì
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteRecurringTransaction(@PathVariable Long id) {
        recurringTransactionService.deleteRecurringTransaction(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
