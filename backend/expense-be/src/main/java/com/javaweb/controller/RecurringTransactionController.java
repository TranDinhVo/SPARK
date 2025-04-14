package com.javaweb.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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

    @PostMapping
    public ResponseEntity<RecurringTransactionResponseDTO> createRecurringTransaction(
            @RequestBody RecurringTransactionRequestDTO recurringTransactionRequestDTO) {
        RecurringTransactionResponseDTO response = recurringTransactionService.createRecurringTransaction(recurringTransactionRequestDTO);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<RecurringTransactionResponseDTO>> getAllRecurringTransactions() {
        List<RecurringTransactionResponseDTO> response = recurringTransactionService.getAllRecurringTransaction();
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<RecurringTransactionResponseDTO> getRecurringTransactionById(@PathVariable Long id) {
        RecurringTransactionResponseDTO response = recurringTransactionService.getRecurringTransactionById(id);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @PutMapping("/{id}")
    public ResponseEntity<RecurringTransactionResponseDTO> updateRecurringTransaction(
            @PathVariable Long id,
            @RequestBody RecurringTransactionRequestDTO recurringTransactionRequestDTO) {
        RecurringTransactionResponseDTO response = recurringTransactionService.updateRecurringTransaction(id, recurringTransactionRequestDTO);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @PatchMapping("/{id}/status")
    public ResponseEntity<RecurringTransactionResponseDTO> updateRecurringTransactionStatus(
            @PathVariable Long id,
            @RequestBody RecurringStatusRequestDTO statusRequest) {
        RecurringStatusEnum status = RecurringStatusEnum.valueOf(statusRequest.getStatus().toUpperCase());
        RecurringTransactionResponseDTO response = recurringTransactionService.updateRecurringTransactionStatus(id, status);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
    


    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteRecurringTransaction(@PathVariable Long id) {
        recurringTransactionService.deleteRecurringTransaction(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}