package com.javaweb.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.javaweb.entity.WalletEntity;
@Repository
public interface WalletRepository extends JpaRepository<WalletEntity, Long> {
	List<WalletEntity> findByUserWalletId(Long userId);
}
