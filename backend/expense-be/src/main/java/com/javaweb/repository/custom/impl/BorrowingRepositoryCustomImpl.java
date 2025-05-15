package com.javaweb.repository.custom.impl;

import java.lang.reflect.Field;
import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.Instant;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.javaweb.Builder.BorrowingSearchBuilder;
import com.javaweb.converter.BorrowingConverter;
import com.javaweb.entity.BorrowingEntity;
import com.javaweb.enums.BorrowingStatusEnum;
import com.javaweb.model.request.BorrowingRequestDTO;
import com.javaweb.model.response.BorrowingResponseDTO;
import com.javaweb.repository.custom.BorrowingRepositoryCustom;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.Query;
import jakarta.transaction.Transactional;
@Transactional
@Repository
public class BorrowingRepositoryCustomImpl implements BorrowingRepositoryCustom{
	
	@Autowired
	private BorrowingConverter borrowingConverter;
	
	 
	
	@PersistenceContext
    private EntityManager entityManager;
	
	@Override
	public BorrowingResponseDTO updateStatus(BorrowingResponseDTO response) {
		if(response.getStatus()==BorrowingStatusEnum.DA_HUY) return response;
		if (response.getRemainTimes() != null && response.getRemainTimes() == response.getTimes()) {
			response.setStatus(BorrowingStatusEnum.HOAN_THANH);
	    }
	    else {
	    	response.setStatus(BorrowingStatusEnum.DANG_HOAT_DONG);
	    }
		
		return response;
	}
	//(số tiền bd / số lần bd) + lãi*số tiền còn nợ
	
//	L1: 2tr + 0.1*20tr = 4tr(2tr vốn + 2 tr lãi)
//	L2: (18tr/9) + 0.1*18TR = 
	
	
	public void updateStatuses(List<Long> completedIds) {
	    if (!completedIds.isEmpty()) {
	        entityManager.createQuery("UPDATE BorrowingEntity b SET b.status = :status WHERE b.id IN :ids")
	                .setParameter("status", BorrowingStatusEnum.HOAN_THANH)
	                .setParameter("ids", completedIds)
	                .executeUpdate();
	    }
	    
	}
	
	 public void querySqlJoin(BorrowingSearchBuilder builder, StringBuilder sql) {
	            sql.append(" LEFT JOIN transaction t ON b.id = t.borrowing_id");
	    }
	
	
	public void normalQuery(BorrowingSearchBuilder builder, StringBuilder where) {
		try {
            Field[] fields = BorrowingSearchBuilder.class.getDeclaredFields();
            for (Field item : fields) {
                item.setAccessible(true);
                String fieldName = item.getName();//lấy key
                Object value = item.get(builder);//value

                if (!fieldName.equals("amount_from") && !fieldName.equals("amount_to") && value != null) {
                    if (item.getType().equals(String.class)) {
                    	where.append(" AND b.").append(fieldName).append(" LIKE '%").append(value).append("%' ");
                    } else if (item.getType().equals(Long.class)) {
                    	where.append(" AND b.").append(fieldName).append(" = ").append(value);
                    } else if (item.getType().equals(BigDecimal.class)) {
                    	where.append(" AND b.").append(fieldName).append(" = ").append(value);
                    } else if (item.getType().equals(Instant.class)) {
                    	where.append(" AND b.").append(fieldName).append(" = '").append(value).append("' ");
                    } else if (item.getType().isEnum()) {
                    	where.append(" AND b.").append(fieldName).append(" = '").append(value.toString()).append("' ");
                    }
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
	}
	
	 public void specialQuery(BorrowingSearchBuilder builder, StringBuilder where) {
	        BigDecimal amountFrom = builder.getAmount_from();
	        BigDecimal amountTo = builder.getAmount_to();
	        if(amountFrom != null) {
	            where.append(" AND b.amount >= "+amountFrom);
	        }
	        if(amountTo != null) {
	        	 where.append(" AND b.amount >= "+amountTo);
	        }
	    }
	
	@Override
	public List<BorrowingResponseDTO> searchBorrowings(BorrowingSearchBuilder builder){
		 StringBuilder sql = new StringBuilder("SELECT b.*,COALESCE(SUM(t.amount), 0) AS paidAmount, COUNT(t.borrowing_id) AS remainTimes FROM borrowing b ");
		 StringBuilder where = new StringBuilder(" WHERE 1=1 ");
		 querySqlJoin(builder,sql);
	     normalQuery(builder,where);
	     specialQuery(builder,where);
	     sql.append(where).append(" GROUP BY b.id; ");
	     
		 List<Long> completedIds = new ArrayList<>();
	     Query query = entityManager.createNativeQuery(sql.toString());
	     List<Object[]> results = query.getResultList();
	     
	     List<BorrowingResponseDTO> responseList =  results.stream().map(row -> {
	    	    try {
	    	    	 BorrowingResponseDTO dto = borrowingConverter
	    	    			 .mapToBorrowingResponseDTO(row);
	    	    	 //cập nhật lại status
	    	 	    dto = updateStatus(dto);
	    	 	    if (dto.getStatus().toString().equals(BorrowingStatusEnum.HOAN_THANH.name())) {
	    	 	    	completedIds.add(dto.getId());
	    	 	    }
	                return dto;
	    	     }catch (Exception e) {
	                    e.printStackTrace();
	                    return null;
	    	     }
	    	})
	    	.filter(dto -> dto != null)
	    	.toList();
	     //đồng bộ status ở database với kết quả trả ra
	     updateStatuses(completedIds);
	     return responseList;
	}
	@Transactional
	@Override
	public BorrowingResponseDTO updateBorrowing(BorrowingRequestDTO request, BorrowingEntity exist) {
		entityManager.merge(exist);
		exist = borrowingConverter.toUpdateBorrowingDTO(request, exist);
		
		StringBuilder sql = new StringBuilder
				("SELECT COALESCE(SUM(t.amount), 0) AS paidAmount, COUNT(t.borrowing_id) AS remainTimes FROM borrowing b LEFT JOIN transaction t ON b.id = t.borrowing_id");
		
		StringBuilder where = new StringBuilder(" WHERE 1=1 ");
		where.append(" AND b.id = ").append(exist.getId()).append(";");
		sql.append(where);
		Query query = entityManager.createNativeQuery(sql.toString());
	    
		BorrowingResponseDTO result = new BorrowingResponseDTO();
		Object[] resultJoin = (Object[]) query.getSingleResult();
		result.setPaidAmount( (BigDecimal) resultJoin[0]);
		result.setRemainTimes(((Number) resultJoin[1]).longValue());
	    result = borrowingConverter.toUpdateBorrowingEntity(exist, result);
		result = updateStatus(result);
		// amount + lãi * (số tiền bd - remainTime*amount)
		BigDecimal monthMoney = exist.getAmount().add(result.getInterestRate().multiply(result.getAmountLoan().subtract(exist.getAmount().multiply(BigDecimal.valueOf(result.getRemainTimes()))))); 
		result.setMonthMoney(monthMoney);
		exist.setStatus(result.getStatus());
		entityManager.merge(exist);
		    
	    return result;
	}

	@Override
	public BorrowingEntity updateEntity(BorrowingEntity entity) {
		entity.setAmount(entity.getAmountLoan().divide(BigDecimal.valueOf(entity.getTimes()),2,RoundingMode.HALF_UP));
		entity.setNextDueDate(
				Instant.now()
		        .atZone(ZoneId.systemDefault())
		        .plusDays(1)
		        .toLocalDateTime()
		        .toLocalDate()
		    );
		return entity;
	}
	@Override
	public List<BorrowingEntity> findBorrowingByAuto() {
		StringBuilder sql = new StringBuilder("SELECT b.* \n"
				+ "FROM borrowing AS b \n"
				+ "WHERE b.auto_create_transaction = 1 \n"
				+ "AND b.status = 'DANG_HOAT_DONG'\n"
				+ "AND b.next_due_date <= CURDATE()\n"
				+ "AND NOT EXISTS (\n"
				+ "    SELECT 1 FROM transaction t \n"
				+ "    WHERE t.borrowing_id = b.id \n"
				+ "    AND DATE(t.created_at) = CURDATE()\n"
				+ ");\n");
		Query query = entityManager.createNativeQuery(sql.toString(), BorrowingEntity.class);
		List<BorrowingEntity> result = query.getResultList();
		return result;
	}

}
