package com.javaweb.service;

import java.util.List;

import com.javaweb.model.request.WalletRequestDTO;
import com.javaweb.model.response.WalletResponseDTO;

public interface WalletService {
	WalletResponseDTO getWalletById(Long id);
    WalletResponseDTO updateWallet(Long id, WalletRequestDTO walletRequestDTO);
    public WalletResponseDTO createWallet(WalletRequestDTO walletRequestDTO);
    public List<WalletResponseDTO> getAllWallets();
    public List<WalletResponseDTO> getWalletsByUserId(Long userId);
    public void deleteWallet(Long id);
}
