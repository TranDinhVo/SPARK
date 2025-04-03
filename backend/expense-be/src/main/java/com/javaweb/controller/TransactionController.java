package com.javaweb.controller;

//import model.TransactionDTO;
import com.javaweb.service.TransactionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/transactions")
public class TransactionController {
//    @Autowired
//    private TransactionService transactionService;
//
//    @GetMapping("/user/{userId}")
//    public List<TransactionDTO> getTransactionsByUserId(@PathVariable Long userId) {
//        return transactionService.getTransactionsByUserId(userId);
//    }
}