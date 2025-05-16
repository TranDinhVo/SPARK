package com.javaweb.service.impl;

import java.time.Instant;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.javaweb.Builder.BorrowingSearchBuilder;
import com.javaweb.converter.BorrowingConverter;
import com.javaweb.converter.BorrowingSearchBuilderConverter;
import com.javaweb.entity.BorrowingEntity;
import com.javaweb.model.request.BorrowingRequestDTO;
import com.javaweb.model.request.TransactionRequestDTO;
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
	private BorrowingConverter borrowingConverter;
	
	@Autowired
	private TransactionServiceImpl transactionServiceImpl;
	
	@Override
	public List<BorrowingResponseDTO> searchBorrowings(Map<String, Object> params) {
		BorrowingSearchBuilder borrowingSearchBuilder = borrowingSearchBuilderConverter.toBorrowingSearchBuilder(params);
		List<BorrowingResponseDTO> result = borrowingRepository.searchBorrowings(borrowingSearchBuilder);//xử lí ở tầng repo custom
		return result;
	}

	@Override
	public boolean deleteById(Long id) {
		if (!borrowingRepository.existsById(id)) {
	        throw new EntityNotFoundException("Không tìm thấy khoản mượn với ID: " + id);
	    }
	    borrowingRepository.deleteById(id);
		return false;
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
		BorrowingEntity newBorrowing = borrowingConverter.toUpdateBorrowingDTO(borrowingRequestDTO, new BorrowingEntity());
		borrowingRepository.updateEntity(newBorrowing);
		BorrowingResponseDTO response = borrowingConverter.toUpdateBorrowingEntity(newBorrowing, new BorrowingResponseDTO());
		
		borrowingRepository.save(newBorrowing);
		response = borrowingRepository.updateBorrowing(borrowingRequestDTO, newBorrowing);
		response.setRemainTimes(Long.valueOf(0));
		return response;
	}

	@Override
	public BorrowingResponseDTO getById(Long id) {
		if (!borrowingRepository.existsById(id)) {
	        throw new EntityNotFoundException("Không tìm thấy khoản mượn với ID: " + id);
	    }
		BorrowingEntity entity = borrowingRepository.findById(id).get();
		return borrowingRepository.updateBorrowing(null, entity);
	}

	@Override
	public List<BorrowingResponseDTO> getByUserId(Long userId) {
		List<BorrowingEntity> entities =  borrowingRepository.findByUserBorrowing_Id(userId);
		List<BorrowingResponseDTO> responseList = entities.stream().map(entity -> {
			BorrowingResponseDTO response = borrowingRepository.updateBorrowing(null, entity);
			return response;
		}).collect(Collectors.toList());
		return responseList;
	}

	@Override
	public List<BorrowingResponseDTO> autoTransactions() {
		//lấy ra list borrowEntity thỏa điều kiện
		List<BorrowingEntity> entities =  borrowingRepository.findBorrowingByAuto();
		if(entities != null) {
				//tạo từng giao dịch cho từng entity ở repo
			List<BorrowingResponseDTO> result = entities.stream().map(item -> {
				item = borrowingRepository.updateEntity(item);
	            borrowingRepository.save(item);
				// amount + lãi * (số tiền bd - remainTime*amount)
				BorrowingResponseDTO borrowResponse = borrowingRepository.updateBorrowing(new BorrowingRequestDTO(), item);
				borrowingRepository.save(item);
				TransactionRequestDTO transactionRequest = new TransactionRequestDTO(item.getUserBorrowing().getId(), item.getId(), null, Long.valueOf(6), null,
						borrowResponse.getMonthMoney(), "", Instant.now());
				transactionServiceImpl.createTransaction(transactionRequest);
				//cập nhật lại status, next-due-date của borrow ở repos
				return borrowResponse;
			}).collect(Collectors.toList());
			
			return result;
		}
		return null;
	}
	
	
	
	
	
}
