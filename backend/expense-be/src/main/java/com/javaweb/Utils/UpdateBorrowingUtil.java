package com.javaweb.Utils;

import java.time.Instant;
import java.util.List;

import com.javaweb.entity.BorrowingEntity;
import com.javaweb.enums.BorrowingStatusEnum;
import com.javaweb.model.response.BorrowingResponseDTO;

public class UpdateBorrowingUtil {
	public static BorrowingResponseDTO update(BorrowingResponseDTO result, List<Long> overdueIds, List<Long> completedIds) {
		 if (result.getPaidAmount().compareTo(result.getAmount()) < 0) {
		        if (result.getDeadline() != null && result.getDeadline().isBefore(Instant.now())) {
		        	result.setStatus(BorrowingStatusEnum.QUA_HAN);
		        } else
		        	result.setStatus(BorrowingStatusEnum.DANG_HOAT_DONG);
		    }
		    else {
		    	result.setStatus(BorrowingStatusEnum.HOAN_THANH);
		    }

		    if (result.getStatus().equals(BorrowingStatusEnum.QUA_HAN.name())) {
		    	overdueIds.add(result.getId());
		    } else if (result.getStatus().equals(BorrowingStatusEnum.HOAN_THANH.name())) {
		    	completedIds.add(result.getId());
		    }
		    return result;
	}
	
//	public static BorrowingEntity update(BorrowingEntity result, List<Long> overdueIds, List<Long> completedIds) {
//		 if (result.getPaidAmount().compareTo(result.getAmount()) < 0) {
//		        if (result.getDeadline() != null && result.getDeadline().isBefore(Instant.now())) {
//		        	result.setStatus(BorrowingStatusEnum.QUA_HAN);
//		        } else
//		        	result.setStatus(BorrowingStatusEnum.DANG_HOAT_DONG);
//		    }
//		    else {
//		    	result.setStatus(BorrowingStatusEnum.HOAN_THANH);
//		    }
//
//		    if (result.getStatus().equals(BorrowingStatusEnum.QUA_HAN.name())) {
//		    	overdueIds.add(result.getId());
//		    } else if (result.getStatus().equals(BorrowingStatusEnum.HOAN_THANH.name())) {
//		    	completedIds.add(result.getId());
//		    }
//		    return result;
	}
//}
