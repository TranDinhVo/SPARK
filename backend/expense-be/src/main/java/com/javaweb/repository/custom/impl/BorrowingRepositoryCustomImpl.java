package com.javaweb.repository.custom.impl;

import java.lang.reflect.Field;
import java.math.BigDecimal;
import java.time.Instant;
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
	
	public BorrowingEntity updateVallet(BorrowingRequestDTO request, BorrowingEntity exist) {
		if (request.getWalletId() != null 
			    && !request.getWalletId().equals(exist.getWalletBorrowing().getId())) {

			    BigDecimal amount = exist.getAmount();
			    Long oldWalletId = request.getWalletId(); // ví cũ
			    Long newWalletId = exist.getWalletBorrowing().getId(); // ví mới

			    boolean isChoVay = "CHO_VAY".equals(exist.getLoanType().toString());

			    String sqlUpdateOld = "UPDATE wallet SET balance = balance " 
			                        + (isChoVay ? "+" : "-") 
			                        + " :amount WHERE id = :walletId";

			    String sqlUpdateNew = "UPDATE wallet SET balance = balance " 
			                        + (isChoVay ? "-" : "+") 
			                        + " :amount WHERE id = :walletId";

			    try {
			        // Update old wallet
			        entityManager.createNativeQuery(sqlUpdateOld)
			            .setParameter("amount", amount)
			            .setParameter("walletId", oldWalletId)
			            .executeUpdate();

			        // Update new wallet
			        entityManager.createNativeQuery(sqlUpdateNew)
			            .setParameter("amount", amount)
			            .setParameter("walletId", newWalletId)
			            .executeUpdate();

			    } catch (Exception e) {
			        e.printStackTrace(); // hoặc log bằng logger cho production
			    }
			}
		return exist;
	}
	
	public BorrowingResponseDTO updateStatus(BorrowingResponseDTO response) {
		if (response.getPaidAmount().compareTo(response.getAmount()) < 0) {
	        if (response.getDeadline() != null && response.getDeadline().isBefore(Instant.now())) {
	        	response.setStatus(BorrowingStatusEnum.QUA_HAN);
	        } else
	        	response.setStatus(BorrowingStatusEnum.DANG_HOAT_DONG);
	    }
	    else {
	    	response.setStatus(BorrowingStatusEnum.HOAN_THANH);
	    }
		return response;
	}
	
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
	     
	     List<Long> overdueIds = new ArrayList<>();
		 List<Long> completedIds = new ArrayList<>();
	     Query query = entityManager.createNativeQuery(sql.toString());
	     List<Object[]> results = query.getResultList();
	     
	     List<BorrowingResponseDTO> responseList =  results.stream().map(row -> {
	    	    try {
	    	    	 BorrowingResponseDTO dto = borrowingConverter
	    	    			 .mapToBorrowingResponseDTO(row,overdueIds,completedIds);
	    	    	 //cập nhật lại status
	    	 	    dto = updateStatus(dto);
	    	 	    if (dto.getStatus().toString().equals(BorrowingStatusEnum.QUA_HAN.name())) {
	    	 	    	overdueIds.add(dto.getId());
	    	 	    } else if (dto.getStatus().toString().equals(BorrowingStatusEnum.HOAN_THANH.name())) {
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
	     updateStatuses(overdueIds, completedIds);
	     return responseList;
	}
	@Transactional
	@Override
	public BorrowingResponseDTO updateBorrowing(BorrowingRequestDTO request, BorrowingEntity exist) {
		//cập nhật ví
		exist = updateVallet(request,exist);
		entityManager.merge(exist);
		
		exist = borrowingConverter.toUpdateBorrowingDTO(request, exist);
		
		StringBuilder sql = new StringBuilder
				("SELECT COALESCE(SUM(t.amount), 0) AS paidAmount FROM borrowing b LEFT JOIN transaction t ON b.id = t.borrowing_id AND ((b.loan_type = 'CHO_MUON' AND t.category_id = 8) OR (b.loan_type = 'DI_VAY' AND t.category_id = 6)) ");
		
		StringBuilder where = new StringBuilder("WHERE 1=1 ");
		where.append(" AND b.id = ").append(exist.getId()).append(";");
		sql.append(where);
		Query query = entityManager.createNativeQuery(sql.toString());
		BigDecimal paidAmount = (BigDecimal) query.getSingleResult();
	    
	    BorrowingResponseDTO result = new BorrowingResponseDTO();
	    result.setPaidAmount(paidAmount);
	    result.setWalletName(exist.getWalletBorrowing().getName());
	    result = borrowingConverter.toUpdateBorrowingEntity(exist, result);
	    
		 result = updateStatus(result);
		 exist.setStatus(result.getStatus());
		 entityManager.merge(exist);
		    
	    return result;
	}

}
