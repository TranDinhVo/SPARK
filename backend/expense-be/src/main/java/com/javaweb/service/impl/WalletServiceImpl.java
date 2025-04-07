package com.javaweb.service.impl;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.javaweb.ControllerAdvice.CustomException.WalletNotFoundException;
import com.javaweb.entity.UserEntity;
import com.javaweb.entity.WalletEntity;
import com.javaweb.model.request.WalletRequestDTO;
import com.javaweb.model.response.WalletResponseDTO;
import com.javaweb.repository.UserRepository;
import com.javaweb.repository.WalletRepository;
import com.javaweb.service.WalletService;
@Service
public class WalletServiceImpl implements WalletService {

    @Autowired
    private WalletRepository walletRepository;

    @Autowired
    private UserRepository userRepository;

    @Override
    public WalletResponseDTO createWallet(WalletRequestDTO walletRequestDTO) {
        UserEntity userEntity = userRepository.findById(walletRequestDTO.getUserId())
            .orElseThrow(() -> new RuntimeException("User not found"));
        WalletEntity walletEntity = new WalletEntity();
        walletEntity.setName(walletRequestDTO.getName());
        walletEntity.setBalance(walletRequestDTO.getBalance());
        walletEntity.setCurrency(walletRequestDTO.getCurrency());
        walletEntity.setUserWallet(userEntity);
        walletRepository.save(walletEntity);
        return new WalletResponseDTO(walletEntity.getId(), walletEntity.getName(), walletEntity.getBalance(), walletEntity.getCurrency());
    }

    @Override
    public WalletResponseDTO updateWallet(Long id, WalletRequestDTO walletRequestDTO) {
        WalletEntity walletEntity = walletRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Wallet not found"));

        if (walletRequestDTO.getName() != null) {
            walletEntity.setName(walletRequestDTO.getName());
        }

        if (walletRequestDTO.getBalance() != null) {
            walletEntity.setBalance(walletRequestDTO.getBalance());
        }

        if (walletRequestDTO.getCurrency() != null) {
            walletEntity.setCurrency(walletRequestDTO.getCurrency());
        }

        walletRepository.save(walletEntity);

        return new WalletResponseDTO(
            walletEntity.getId(),
            walletEntity.getName(),
            walletEntity.getBalance(),
            walletEntity.getCurrency()
        );
    }


    @Override
    public WalletResponseDTO getWalletById(Long id) {
        WalletEntity walletEntity = walletRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Wallet not found"));
        return new WalletResponseDTO(walletEntity.getId(), walletEntity.getName(), walletEntity.getBalance(), walletEntity.getCurrency());
    }

    @Override
    public List<WalletResponseDTO> getAllWallets() {
        List<WalletEntity> walletEntities = walletRepository.findAll();
        return walletEntities.stream()
            .map(wallet -> new WalletResponseDTO(wallet.getId(), wallet.getName(), wallet.getBalance(), wallet.getCurrency()))
            .collect(Collectors.toList());
    }

    @Override
    public List<WalletResponseDTO> getWalletsByUserId(Long userId) {
        List<WalletEntity> walletEntities = walletRepository.findByUserWalletId(userId);
        return walletEntities.stream()
            .map(wallet -> new WalletResponseDTO(wallet.getId(), wallet.getName(), wallet.getBalance(), wallet.getCurrency()))
            .collect(Collectors.toList());
    }

    @Override
    
    public void deleteWallet(Long id) {
    	Optional<WalletEntity> wallet = walletRepository.findById(id);
        if (wallet.isPresent()) {
            walletRepository.delete(wallet.get());
        } else {
            throw new WalletNotFoundException("Wallet not found with id " + id);
        }
//        WalletEntity walletEntity = walletRepository.findById(id)
//            .orElseThrow(() -> new RuntimeException("Wallet not found"));
//        walletRepository.delete(walletEntity);
    }
}
