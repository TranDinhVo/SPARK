package com.javaweb.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.javaweb.entity.BorrowingEntity;
import com.javaweb.repository.custom.BorrowingRepositoryCustom;

@Repository
public interface BorrowingRepository extends JpaRepository<BorrowingEntity, Long>, BorrowingRepositoryCustom {
    // Các phương thức query cơ bản nếu cần
}
