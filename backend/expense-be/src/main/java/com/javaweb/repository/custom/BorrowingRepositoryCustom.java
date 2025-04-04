package com.javaweb.repository.custom;

import java.util.List;

import com.javaweb.Builder.BorrowingSearchBuilder;
import com.javaweb.entity.BorrowingEntity;
import com.javaweb.model.request.BorrowingRequestDTO;
import com.javaweb.model.response.BorrowingResponseDTO;

public interface BorrowingRepositoryCustom {
	List<BorrowingResponseDTO> searchBorrowings(BorrowingSearchBuilder builder);
	BorrowingResponseDTO updateBorrowing(BorrowingRequestDTO request, BorrowingEntity exist);
}
