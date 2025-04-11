package com.javaweb.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.javaweb.model.request.BorrowingRequestDTO;
import com.javaweb.model.response.BorrowingResponseDTO;
import com.javaweb.model.response.GoalResponseDTO;
import com.javaweb.service.BorrowingService;

@RestController
@RequestMapping("/api/borrowings")
public class BorrowingAPI {
	
	@Autowired
    private BorrowingService borrowingService;
//	Thêm
	@PostMapping
	public BorrowingResponseDTO createNewBorrowing(@RequestBody BorrowingRequestDTO borrowingRequestDTO) {
		BorrowingResponseDTO response = borrowingService.createNewBorrowing(borrowingRequestDTO);
		return response;
	}
	
	
//	Xóa theo id
	@DeleteMapping("/{id}")
	public void deleteById(@PathVariable Long id) {
		borrowingService.deleteById(id);
	    }
	
	//Tìm kiếm nhiều thông tin/ Lấy ra thông tin
	@GetMapping
	public List<BorrowingResponseDTO> searchBorrowings(@RequestParam Map<String,Object> params) {
		List<BorrowingResponseDTO> borrowings = borrowingService.searchBorrowings(params);
		return borrowings;
	    }
	
	@GetMapping("/{id}")
	public BorrowingResponseDTO getBorowingById(@PathVariable Long id) {
		return borrowingService.getById(id);
	}
	
	@GetMapping("/user/{userId}")
	public List<BorrowingResponseDTO> getBorowingByUserId(@PathVariable Long userId){
		return borrowingService.getByUserId(userId);
	}
	
	
	
	
	
	
	//Chỉnh sửa 1 thông tin
	@PatchMapping("/{id}")
	public BorrowingResponseDTO updateBorrowing(
			@PathVariable Long id,
			@RequestBody BorrowingRequestDTO borrowingRequestDTO) {
		borrowingRequestDTO.setId(id);
		borrowingRequestDTO.setLoanType(null);
		BorrowingResponseDTO borrowing = borrowingService.updateBorrowing(borrowingRequestDTO);
		return borrowing;
	    }
}
