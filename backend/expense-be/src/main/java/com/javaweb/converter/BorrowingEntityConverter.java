package com.javaweb.converter;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.javaweb.entity.BorrowingEntity;
import com.javaweb.model.request.BorrowingRequestDTO;

@Component
public class BorrowingEntityConverter {
	
	@Autowired
	private ModelMapper modelMapper;
	
	public BorrowingEntity toUpdateBorrowingDTO (BorrowingRequestDTO item, BorrowingEntity exist) {
		modelMapper.map(item, exist);
		return exist;
	}
	
	
}
