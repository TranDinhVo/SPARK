//package com.javaweb.converter;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.stereotype.Component;
//
//import com.javaweb.entity.TransactionEntity;
//import com.javaweb.model.response.RecurringTransactionResponseDTO;
//import com.javaweb.model.response.TransactionResponseDTO;
//import com.javaweb.model.response.WalletResponseDTO;
//
//@Component
//public class TransactionConverter {
//	@Autowired
//	private RecurringTransactionConverter recurringTransactionConverter;
//	
//	@Autowired
//	private BorrowingConverter borrowingConverter;
//	
//	
//	public TransactionResponseDTO convertToDTO(TransactionEntity entity) {
//
//        RecurringTransactionResponseDTO recurrence = null;
//        if (entity.getRecurringTransaction() != null) {
//            recurrence = recurringTransactionConverter.convertToResponse(entity.getRecurringTransaction());
//        }
//        
//        Long borrowId = null;
//        if(entity.getBorrowingTransaction() != null) {
//        	borrowId = entity.getBorrowingTransaction().getId();
//        }
//        Long goalId = null;
//        if(entity.getGoalTransaction() != null) {
//        	goalId = entity.getGoalTransaction().getId();
//        }
//
////        return new TransactionResponseDTO(
////                entity.getId(),
////                entity.getUserTransaction().getId(),
////                borrowId,
////                goalId,
////                entity.getCategoryTransaction().getType().toString(),
////                entity.getCategoryTransaction().getName(),
////                entity.getAmount(),
////                entity.getDescription(),
////                entity.getStatus(),
////                entity.getCreatedAt(),
////                recurrence
////        );
//        return null;
//    }
//}
