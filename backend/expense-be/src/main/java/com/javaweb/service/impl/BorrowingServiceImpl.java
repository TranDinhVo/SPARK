package com.javaweb.service.impl;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.javaweb.Builder.BorrowingSearchBuilder;
import com.javaweb.CustomException.ExistIdException;
import com.javaweb.converter.BorrowingConverter;
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
	BorrowingConverter borrowingConverter;
	
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
		//tìm và lấy khoản mượn
		BorrowingEntity existingBorrowing = borrowingRepository.findById(borrowingRequestDTO.getId()).get();
		
		BorrowingResponseDTO result = new BorrowingResponseDTO();
		//xử lí cập nhật status
		result = borrowingRepository.updateBorrowing(borrowingRequestDTO, existingBorrowing);
		return result;
	}

	@Override
	public BorrowingResponseDTO createNewBorrowing(BorrowingRequestDTO borrowingRequestDTO) {
		borrowingRequestDTO.validate();
		BorrowingEntity newBorrowing = borrowingConverter.toUpdateBorrowingDTO(borrowingRequestDTO, new BorrowingEntity());
		BorrowingResponseDTO response = borrowingConverter.toUpdateBorrowingEntity(newBorrowing, new BorrowingResponseDTO());
		
		borrowingRepository.save(newBorrowing);
		response = borrowingRepository.updateBorrowing(borrowingRequestDTO, newBorrowing);
		return response;
	}
	 
	
	
	
	
}
