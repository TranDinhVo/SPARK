package com.javaweb.ControllerAdvice;

import java.util.ArrayList;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import com.javaweb.ControllerAdvice.CustomException.ResourceNotFoundException;
import com.javaweb.ControllerAdvice.CustomException.WalletNotFoundException;
import com.javaweb.CustomException.ExistIdException;
import com.javaweb.model.response.ErrorResponseDTO;

import jakarta.persistence.EntityNotFoundException;

@ControllerAdvice
public class ControllerAdvisor extends ResponseEntityExceptionHandler{
	 @ExceptionHandler(EntityNotFoundException.class)
	    public ResponseEntity<Object> handleEntityNotFoundException(
	    		EntityNotFoundException ex, WebRequest request) {
		 	ErrorResponseDTO errorResponseDTO = new ErrorResponseDTO();
		 	errorResponseDTO.setError("Không tìm thấy tài nguyên!");
		 	List<String> details = new ArrayList<String>();
		 	details.add(ex.getMessage());
		 	errorResponseDTO.setDetail(details);
	        return new ResponseEntity<>(errorResponseDTO, HttpStatus.NOT_FOUND);
	    }
	 @ExceptionHandler(ExistIdException.class)
	    public ResponseEntity<Object> handleExistIdException(
	    		ExistIdException ex, WebRequest request) {
		 	ErrorResponseDTO errorResponseDTO = new ErrorResponseDTO();
		 	errorResponseDTO.setError("Id đã tồn tại!");
		 	List<String> details = new ArrayList<String>();
		 	details.add(ex.getMessage());
		 	errorResponseDTO.setDetail(details);
	        return new ResponseEntity<>(errorResponseDTO, HttpStatus.CONFLICT);
	    }

	 @ExceptionHandler(IllegalArgumentException.class)
	    public ResponseEntity<Object> handleIllegalArgumentException(
	    		IllegalArgumentException ex, WebRequest request) {
		 	ErrorResponseDTO errorResponseDTO = new ErrorResponseDTO();
		 	errorResponseDTO.setError("Nhập lại thông tin!");
		 	List<String> details = new ArrayList<String>();
		 	details.add(ex.getMessage());
		 	errorResponseDTO.setDetail(details);
	        return new ResponseEntity<>(errorResponseDTO, HttpStatus.BAD_REQUEST);
	 }
	 @ExceptionHandler(WalletNotFoundException.class)
	    public ResponseEntity<Object> handleWalletNotFoundException(WalletNotFoundException ex) {
	        // Tạo ErrorResponseDTO và trả về thông báo lỗi cho WalletNotFoundException
	        ErrorResponseDTO errorResponseDTO = new ErrorResponseDTO();
	        errorResponseDTO.setError("Ví không tồn tại!");
	        List<String> details = new ArrayList<>();
	        details.add(ex.getMessage());
	        errorResponseDTO.setDetail(details);
	        return new ResponseEntity<>(errorResponseDTO, HttpStatus.NOT_FOUND);
	    }
	 
	 @ExceptionHandler(ResourceNotFoundException.class)
	    public ResponseEntity<String> handleResourceNotFound(ResourceNotFoundException ex) {
	        return new ResponseEntity<>(ex.getMessage(), HttpStatus.NOT_FOUND);

	    }
}
