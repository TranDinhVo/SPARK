package com.javaweb.service;

import java.util.List;
import java.util.Map;

import com.javaweb.model.dto.BorrowingDTO;
import com.javaweb.model.request.BorrowingRequestDTO;
import com.javaweb.model.response.BorrowingResponseDTO;

public interface BorrowingService {
//	List<DetailBorrowingDTO> getRecentAllBorrowings();
//	DetailBorrowingDTO getBorrowingById(Long id);
	List<BorrowingResponseDTO> searchBorrowings(Map<String,Object> params);
	void deleteById(Long id);
	BorrowingResponseDTO updateBorrowing(BorrowingRequestDTO borrowingRequestDTO);
}
