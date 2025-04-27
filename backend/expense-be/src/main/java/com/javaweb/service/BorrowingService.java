package com.javaweb.service;

import java.util.List;
import java.util.Map;

import com.javaweb.model.request.BorrowingRequestDTO;
import com.javaweb.model.response.BorrowingResponseDTO;

public interface BorrowingService {
	List<BorrowingResponseDTO> searchBorrowings(Map<String,Object> params);
	boolean deleteById(Long id);
	BorrowingResponseDTO updateBorrowing(BorrowingRequestDTO borrowingRequestDTO);
	BorrowingResponseDTO createNewBorrowing(BorrowingRequestDTO borrowingRequestDTO);
	BorrowingResponseDTO getById(Long id);
	List<BorrowingResponseDTO> getByUserId(Long userId);
}
