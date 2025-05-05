package com.javaweb.controller;

import java.time.Instant;
import java.time.format.DateTimeParseException;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.javaweb.model.request.TransactionRequestDTO;
import com.javaweb.model.response.TransactionResponseDTO;
import com.javaweb.service.TransactionService;


@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/transactions")
public class TransactionController {

    @Autowired
    private TransactionService transactionService;

    @PostMapping
    public ResponseEntity<TransactionResponseDTO> createTransaction(@RequestBody TransactionRequestDTO transactionRequest) {
        // Xử lý createdAt nếu không được cung cấp
        if (transactionRequest.getCreatedAt() == null) {
            transactionRequest.setCreatedAt(Instant.now());
        }
        TransactionResponseDTO newTransaction = transactionService.createTransaction(transactionRequest);
        return ResponseEntity.status(HttpStatus.CREATED).body(newTransaction);
    }

    @GetMapping("/{id}")
    public ResponseEntity<TransactionResponseDTO> getTransactionById(@PathVariable Long id) {
        TransactionResponseDTO transaction = transactionService.getTransactionById(id);
        if (transaction != null) {
            return ResponseEntity.ok(transaction);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<TransactionResponseDTO>> getTransactionsByUserId(@PathVariable Long userId) {
        return ResponseEntity.ok(transactionService.getTransactionsByUserId(userId));
    }

    @GetMapping
    public ResponseEntity<List<TransactionResponseDTO>> getAllTransactions() {
        return ResponseEntity.ok(transactionService.getAllTransactions());
    }

    @PutMapping("/{id}")
    public ResponseEntity<TransactionResponseDTO> updateTransaction(@PathVariable Long id, @RequestBody TransactionRequestDTO transactionRequest) {
        TransactionResponseDTO updatedTransaction = transactionService.updateTransaction(id, transactionRequest);
        if (updatedTransaction != null) {
            return ResponseEntity.ok(updatedTransaction);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // Thêm phương thức PATCH
    @PatchMapping("/{id}")
    public ResponseEntity<TransactionResponseDTO> patchTransaction(@PathVariable Long id, @RequestBody TransactionRequestDTO transactionRequest) {
        TransactionResponseDTO updatedTransaction = transactionService.updateTransaction(id, transactionRequest);
        if (updatedTransaction != null) {
            return ResponseEntity.ok(updatedTransaction);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteTransaction(@PathVariable Long id) {
        Map<String, Object> result = transactionService.deleteTransaction(id);
        if ((boolean) result.get("success")) {
            return ResponseEntity.ok(result);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(result);
        }
    }

    @GetMapping("/daterange")
    public ResponseEntity<?> getTransactionsByDateRange(
            @RequestParam Long userId,
            @RequestParam String startDate,
            @RequestParam String endDate) {
        
        try {
            Instant start = Instant.parse(startDate);
            Instant end = Instant.parse(endDate);
            
            List<TransactionResponseDTO> transactions = transactionService.getTransactionsByDateRange(userId, start, end);
            return ResponseEntity.ok(transactions);
        } catch (DateTimeParseException e) {
            return ResponseEntity.badRequest().body(Map.of(
                "error", "Invalid date format. Please use ISO-8601 format (e.g., 2023-05-01T00:00:00Z)",
                "message", e.getMessage()
            ));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of(
                "error", "An error occurred while processing your request",
                "message", e.getMessage()
            ));
        }
    }
}