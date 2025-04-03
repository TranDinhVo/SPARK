package com.javaweb.service.impl;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.javaweb.Builder.BorrowingSearchBuilder;
import com.javaweb.converter.BorrowingEntityConverter;
import com.javaweb.converter.BorrowingResponseConverter;
import com.javaweb.converter.BorrowingSearchBuilderConverter;
import com.javaweb.entity.BorrowingEntity;
import com.javaweb.model.request.BorrowingRequestDTO;
import com.javaweb.model.response.BorrowingResponseDTO;
import com.javaweb.repository.BorrowingRepository;
import com.javaweb.service.BorrowingService;

import jakarta.persistence.EntityNotFoundException;

@Service
public class BorrowingServiceImpl implements BorrowingService{
	
	@Autowired
	private BorrowingRepository borrowingRepository;
	
	@Autowired
	private BorrowingSearchBuilderConverter borrowingSearchBuilderConverter;
	
	@Autowired
	private BorrowingEntityConverter borrowingEntityConverter;
	
	@Autowired
	BorrowingResponseConverter borrowingResponseConverter;
	
	@Override
	public List<BorrowingResponseDTO> searchBorrowings(Map<String, Object> params) {
		BorrowingSearchBuilder borrowingSearchBuilder = borrowingSearchBuilderConverter.toBorrowingSearchBuilder(params);
		List<BorrowingResponseDTO> result = borrowingRepository.searchBorrowings(borrowingSearchBuilder);//xử lí ở tầng repo custom
		return result;
	}

	@Override
	public void deleteById(Long id) {
		if (!borrowingRepository.existsById(id)) {
	        throw new EntityNotFoundException("Không tìm thấy khoản mượn với ID: " + id);
	    }
	    borrowingRepository.deleteById(id);
	}

	@Override
	public BorrowingResponseDTO updateBorrowing(BorrowingRequestDTO borrowingRequestDTO) {
		BorrowingEntity existingBorrowing = borrowingRepository.findById(borrowingRequestDTO.getId()).get();
		
		//Map vào 
		existingBorrowing = borrowingEntityConverter.toUpdateBorrowingDTO(borrowingRequestDTO, existingBorrowing);

		BorrowingResponseDTO result = new BorrowingResponseDTO();
		result = borrowingRepository.updateBorrowing(existingBorrowing);
		return result;
	}
	 
	
	
	
	
}
