package com.javaweb.converter;

import java.math.BigDecimal;
import java.sql.Timestamp;
import java.time.Instant;
import java.util.List;

import org.modelmapper.Conditions;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.javaweb.entity.BorrowingEntity;
import com.javaweb.model.request.BorrowingRequestDTO;
import com.javaweb.model.response.BorrowingResponseDTO;
@Component
public class BorrowingConverter {
	@Autowired
	private ModelMapper modelMapper;
	
	public BorrowingResponseDTO mapToBorrowingResponseDTO(Object[] row,List<Long> overdueIds, List<Long> completedIds) {
	    BigDecimal amount = (row.length > 0 && row[0] != null) ? (BigDecimal) row[0] : BigDecimal.ZERO;
	    BigDecimal interestRate = (row.length > 1 && row[1] != null) ? (BigDecimal) row[1] : BigDecimal.ZERO;
	    Instant createdAt = (row.length > 2 && row[2] != null) ? ((Timestamp) row[2]).toInstant() : null;
	    Instant deadline = (row.length > 3 && row[3] != null) ? ((Timestamp) row[3]).toInstant() : null;
	    Long id = (row.length > 4 && row[4] != null) ? ((Number) row[4]).longValue() : null;
	    String counterpartyName = (row.length > 7 && row[7] != null) ? (String) row[7] : "";
	    String loanType = (row.length > 8 && row[8] != null) ? (String) row[8] : "";
	    String status = (row.length > 9 && row[9] != null) ? (String) row[9] : "";
	    BigDecimal paidAmount = (row.length > 10 && row[10] != null) ? (BigDecimal) row[10] : BigDecimal.ZERO;
	    String walletName = (row.length > 11 && row[11] != null) ? (String) row[11] : "";

	    return new BorrowingResponseDTO(id, walletName, counterpartyName, amount, interestRate, deadline, loanType, status, createdAt, paidAmount);	  
	}
	
	public BorrowingResponseDTO toUpdateBorrowingEntity(BorrowingEntity entity, BorrowingResponseDTO response) {		
		if (entity == null || response == null) {
	        throw new IllegalArgumentException("Entity hoặc Response không được null");
	    }
	    // Bỏ qua các giá trị null khi ánh xạ
	    modelMapper.getConfiguration().setPropertyCondition(Conditions.isNotNull());

	    // Ánh xạ dữ liệu từ entity sang response
	    modelMapper.map(entity, response);

	    return response;
	}
	
	public BorrowingResponseDTO requestConvertToResponse(BorrowingRequestDTO request, BorrowingResponseDTO response) {
		modelMapper.getConfiguration().setPropertyCondition(Conditions.isNotNull());

	    // Ánh xạ dữ liệu từ entity sang response
	    modelMapper.map(request, response);
	    return response;
	}
	public BorrowingEntity toUpdateBorrowingDTO (BorrowingRequestDTO item, BorrowingEntity exist) {
		modelMapper.map(item, exist);
		return exist;
	}
}
