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
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.javaweb.ControllerAdvice.CustomException.WalletNotFoundException;
import com.javaweb.model.request.WalletRequestDTO;
import com.javaweb.model.response.WalletResponseDTO;
import com.javaweb.service.WalletService;

@RestController
@RequestMapping("/api/wallets")
public class WalletController {

    @Autowired
    private WalletService walletService;

    @PostMapping
    public ResponseEntity<WalletResponseDTO> createWallet(@RequestBody WalletRequestDTO walletRequestDTO) {
        WalletResponseDTO walletResponseDTO = walletService.createWallet(walletRequestDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(walletResponseDTO);
    }

    @PatchMapping("/{id}")
    public ResponseEntity<WalletResponseDTO> updateWallet(@PathVariable Long id, @RequestBody WalletRequestDTO walletRequestDTO) {
        try {
            WalletResponseDTO walletResponseDTO = walletService.updateWallet(id, walletRequestDTO);
            return ResponseEntity.ok(walletResponseDTO);
        } catch (WalletNotFoundException ex) {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<WalletResponseDTO> getWalletById(@PathVariable Long id) {
        try {
            WalletResponseDTO walletResponseDTO = walletService.getWalletById(id);
            return ResponseEntity.ok(walletResponseDTO);
        } catch (WalletNotFoundException ex) {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping
    public ResponseEntity<List<WalletResponseDTO>> getAllWallets() {
        List<WalletResponseDTO> walletResponseDTOs = walletService.getAllWallets();
        return ResponseEntity.ok(walletResponseDTOs);
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<WalletResponseDTO>> getWalletsByUserId(@PathVariable Long userId) {
        List<WalletResponseDTO> walletResponseDTOs = walletService.getWalletsByUserId(userId);
        return ResponseEntity.ok(walletResponseDTOs);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteWallet(@PathVariable Long id) {
        try {
            walletService.deleteWallet(id);
            return ResponseEntity.noContent().build();
        } catch (WalletNotFoundException ex) {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
    }
}
