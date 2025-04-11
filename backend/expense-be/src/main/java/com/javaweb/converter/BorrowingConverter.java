package com.javaweb.converter;

import java.math.BigDecimal;
import java.sql.Timestamp;
import java.time.Instant;
import java.time.LocalDate;
import java.util.List;

import org.modelmapper.Conditions;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.javaweb.entity.BorrowingEntity;
import com.javaweb.enums.BorrowingStatusEnum;
import com.javaweb.enums.LoanTypeEnum;
import com.javaweb.model.request.BorrowingRequestDTO;
import com.javaweb.model.response.BorrowingResponseDTO;
@Component
public class BorrowingConverter {
	@Autowired
	private ModelMapper modelMapper;
	
	public BorrowingResponseDTO mapToBorrowingResponseDTO(Object[] row) {
	    Long id = (row.length > 0 && row[0] != null) ? ((Number) row[0]).longValue() : null;
	    BigDecimal amount = (row.length > 2 && row[2] != null) ? (BigDecimal) row[2] : BigDecimal.ZERO;
	    BigDecimal amountLoan = (row.length > 3 && row[3] != null) ? (BigDecimal) row[3] : BigDecimal.ZERO;
	    BigDecimal interestRate = (row.length > 4 && row[4] != null) ? (BigDecimal) row[4] : BigDecimal.ZERO;
	    Instant createdAt = (row.length > 5 && row[5] != null) ? ((Timestamp) row[5]).toInstant() : null;
	    LocalDate nextDueDate = (row.length > 6 && row[6] != null) ? ((java.sql.Date) row[6]).toLocalDate() : null;
	    Long times = (row.length > 7 && row[7] != null) ? ((Number) row[7]).longValue() : null;
	    String counterpartyName = (row.length > 8 && row[8] != null) ? (String) row[8] : "";
	    LoanTypeEnum loanTypeEnum = (row.length > 9 && row[9] != null) ? LoanTypeEnum.valueOf((String) row[9]) : null;
	    BorrowingStatusEnum statusEnum = (row.length > 10 && row[10] != null) ? BorrowingStatusEnum.valueOf((String) row[10]) : null;
	    BigDecimal paidAmount = (row.length > 11 && row[11] != null) ? (BigDecimal) row[11] : BigDecimal.ZERO;
	    Long remainTimes = (row.length > 12 && row[12] != null) ? ((Number) row[12]).longValue() : null;

	    return new BorrowingResponseDTO(id, counterpartyName, amount, interestRate, remainTimes, times, loanTypeEnum, statusEnum, createdAt, nextDueDate, paidAmount);
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
		if(request != null) {
			modelMapper.getConfiguration().setPropertyCondition(Conditions.isNotNull());

			// Ánh xạ dữ liệu từ entity sang response
			modelMapper.map(request, response);
			return response;
	    }
		return response;
	}
	public BorrowingEntity toUpdateBorrowingDTO (BorrowingRequestDTO item, BorrowingEntity exist) {
		if(item == null) return exist;
		modelMapper.map(item, exist);
		return exist;
	}
	
	public BorrowingResponseDTO convertToResponse(BorrowingEntity entity) {
		BorrowingResponseDTO response = new BorrowingResponseDTO();
		modelMapper.getConfiguration().setPropertyCondition(Conditions.isNotNull());
	    modelMapper.map(response, entity);
	    return response;
	}
}
