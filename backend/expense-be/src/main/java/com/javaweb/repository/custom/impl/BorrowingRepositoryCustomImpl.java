package com.javaweb.repository.custom.impl;

import java.lang.reflect.Field;
import java.math.BigDecimal;
import java.time.Instant;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.javaweb.Builder.BorrowingSearchBuilder;
import com.javaweb.converter.BorrowingResponseConverter;
import com.javaweb.entity.BorrowingEntity;
import com.javaweb.enums.BorrowingStatusEnum;
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
	private BorrowingResponseConverter borrowingResponseConverter;
	
	 public List<Long> overdueIds = new ArrayList<>();
	 public List<Long> completedIds = new ArrayList<>();
	
	@PersistenceContext
    private EntityManager entityManager;
	
	public void updateStatuses(List<Long> overdueIds, List<Long> completedIds) {
	    if (!overdueIds.isEmpty()) {
	        entityManager.createQuery("UPDATE BorrowingEntity b SET b.status = :status WHERE b.id IN :ids")
	                .setParameter("status", BorrowingStatusEnum.QUA_HAN)
	                .setParameter("ids", overdueIds)
	                .executeUpdate();
	    }

	    if (!completedIds.isEmpty()) {
	        entityManager.createQuery("UPDATE BorrowingEntity b SET b.status = :status WHERE b.id IN :ids")
	                .setParameter("status", BorrowingStatusEnum.HOAN_THANH)
	                .setParameter("ids", completedIds)
	                .executeUpdate();
	    }
	    
	}
	
	 public void querySqlJoin(BorrowingSearchBuilder builder, StringBuilder sql) {
	            sql.append(" LEFT JOIN transaction t ON b.id = t.borrowing_id AND ((b.loan_type = 'CHO_MUON' AND t.category_id = 8) OR (b.loan_type = 'DI_VAY' AND t.category_id = 6)) ");
	            sql.append("INNER JOIN wallet AS w ON w.id = b.wallet_id ");
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
	        BigDecimal amountFrom = builder.getAmountFrom();
	        BigDecimal amountTo = builder.getAmountTo();
	        if(amountFrom != null) {
	            where.append(" AND b.amount >= "+amountFrom);
	        }
	        if(amountTo != null) {
	        	 where.append(" AND b.amount >= "+amountTo);
	        }
	    }
	
	@Override
	public List<BorrowingResponseDTO> searchBorrowings(BorrowingSearchBuilder builder){
		 StringBuilder sql = new StringBuilder("SELECT b.*,COALESCE(SUM(t.amount), 0) AS paidAmount, w.`name` AS walletName FROM borrowing b ");
		 StringBuilder where = new StringBuilder(" WHERE 1=1 ");
		 querySqlJoin(builder,sql);
	     normalQuery(builder,where);
	     specialQuery(builder,where);
	     sql.append(where).append(" GROUP BY b.id; ");
	     
	     Query query = entityManager.createNativeQuery(sql.toString());
	     List<Object[]> results = query.getResultList();
	     
	     List<BorrowingResponseDTO> responseList =  results.stream().map(row -> {
	    	    try {
	    	    	 BorrowingResponseDTO dto = borrowingResponseConverter
	    	    			 .mapToBorrowingResponseDTO(row,overdueIds,completedIds);
	    	    	 
	                 return dto;
	    	     }catch (Exception e) {
	                    e.printStackTrace();
	                    return null;
	    	     }
	    	})
	    	.filter(dto -> dto != null)
	    	.toList();
	     updateStatuses(overdueIds, completedIds);
	     return responseList;
	}
	@Transactional
	@Override
	public BorrowingResponseDTO updateBorrowing(BorrowingEntity existingBorrowing) {
		entityManager.merge(existingBorrowing);
		entityManager.flush();
		BorrowingEntity update = entityManager.find(BorrowingEntity.class, existingBorrowing.getId());
		StringBuilder sql = new StringBuilder
				("SELECT SUM(t.amount) AS paidAmount FROM borrowing AS b INNER JOIN transaction t ON b.id = t.borrowing_id ");
		
		StringBuilder where = new StringBuilder("WHERE 1=1 ");
		where.append(" AND b.id = ").append(update.getId()).append(";");
		sql.append(where);
		
		Query query = entityManager.createNativeQuery(sql.toString());
	    BigDecimal paidAmount = (BigDecimal) query.getSingleResult();
	    
	    BorrowingResponseDTO result = new BorrowingResponseDTO();
	    result = borrowingResponseConverter.toUpdateBorrowingEntity(update, result);
	    result.setPaidAmount(paidAmount);
		
		 if (paidAmount.compareTo(result.getAmount()) < 0) {
		        if (result.getDeadline() != null && result.getDeadline().isBefore(Instant.now())) {
		            result.setStatus(BorrowingStatusEnum.QUA_HAN);
		        } else
		        	result.setStatus(BorrowingStatusEnum.DANG_HOAT_DONG);
		    }
		    else {
		    	result.setStatus(BorrowingStatusEnum.HOAN_THANH);
		    }
		 
		 	update.setStatus(result.getStatus());
		 	entityManager.flush();
		    
	    return borrowingResponseConverter.toUpdateBorrowingEntity(existingBorrowing, result);
	} 
}
