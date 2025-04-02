package com.javaweb.repository.custom;

import java.math.BigDecimal;
import java.util.List;

import com.javaweb.Builder.BorrowingSearchBuilder;
import com.javaweb.entity.BorrowingEntity;
import com.javaweb.model.response.BorrowingResponseDTO;

public interface BorrowingRepositoryCustom {
	List<BorrowingResponseDTO> searchBorrowings(BorrowingSearchBuilder builder);
	BorrowingResponseDTO updateBorrowing(BorrowingEntity existingBorrowing);
}
