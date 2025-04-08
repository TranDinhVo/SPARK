package com.javaweb.repository.custom.impl;

import java.lang.reflect.Field;
import java.math.BigDecimal;
import java.time.Instant;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.javaweb.Builder.BudgetSearchBuilder;
import com.javaweb.converter.BudgetConverter;
import com.javaweb.model.request.BudgetRequestDTO;
import com.javaweb.model.response.BudgetResponseDTO;
import com.javaweb.model.response.GoalResponseDTO;
import com.javaweb.repository.custom.BudgetRepositoryCustom;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.Query;

@Repository
public class BudgetRepositoryCustomImpl implements BudgetRepositoryCustom{
	@PersistenceContext
    private EntityManager entityManager;
	
	@Autowired
	BudgetConverter budgetConverter;
	
	
	public void normalQuery(BudgetSearchBuilder builder, StringBuilder where) {
		 try {
			 Field[] fields = BudgetSearchBuilder.class.getDeclaredFields();
			 for (Field item : fields) {
				 item.setAccessible(true);
				 String fieldName = item.getName();
				 Object value = item.get(builder);

				 if (!fieldName.equals("amount_from") && !fieldName.equals("amount_to") && value != null) {
					 if (item.getType().equals(String.class)) {
						 where.append(" AND g.").append(fieldName).append(" LIKE '%").append(value).append("%' ");
					 } else if (item.getType().equals(Long.class)) {
						 where.append(" AND g.").append(fieldName).append(" = ").append(value);
					 } else if (item.getType().equals(BigDecimal.class)) {
						 where.append(" AND g.").append(fieldName).append(" = ").append(value);
					 } else if (item.getType().equals(Instant.class)) {
	                    	where.append(" AND b.").append(fieldName).append(" = '").append(value).append("' ");
					 } else if (item.getType().isEnum()) {
						 where.append(" AND g.").append(fieldName).append(" = '").append(value.toString()).append("' ");
					 }
				 }
			 }
		 } catch (Exception e) {
			 e.printStackTrace();
		 }
	 }

	 public void specialQuery(BudgetSearchBuilder builder, StringBuilder where) {
		BigDecimal amountFrom = builder.getAmount_from();
		BigDecimal amountTo = builder.getAmount_to();
		if(amountFrom != null) {
			where.append(" AND g.amount >= "+amountFrom);
		}
		if(amountTo != null) {
			where.append(" AND g.amount <= "+amountTo);
		}
	 }
	@Override
	public List<BudgetResponseDTO> getAllBudgets(BudgetSearchBuilder builder) {
		//Tạo sql lấy ra list response
		StringBuilder sql = new StringBuilder("SELECT b.*, c.`name`, COALESCE(SUM(t.amount), 0) AS usedAmount FROM budget AS b "
				+ "JOIN category AS c ON b.category_id = c.id LEFT JOIN transaction AS t \r\n"
				+ "    ON b.category_id = t.category_id \r\n"
				+ "    AND t.user_id = b.user_id\r\n"
				+ "    AND t.`status` = TRUE\r\n"
				+ "    AND t.created_at BETWEEN b.start_date AND b.end_date");
		StringBuilder where = new StringBuilder(" WHERE 1=1 ");
		normalQuery(builder,where);
		specialQuery(builder,where);
		sql.append(where).append(" GROUP BY b.id, c.`name`;");
		
		Query query = entityManager.createNativeQuery(sql.toString());
	     List<Object[]> results = query.getResultList();
	     List<BudgetResponseDTO> responseList =  results.stream().map(row -> {
	    	    try {
	    	    	 BudgetResponseDTO dto = budgetConverter
	    	    			 .mapToGoalResponseDTO(row);
	                return dto;
	    	     }catch (Exception e) {
	                    e.printStackTrace();
	                    return null;
	    	     }
	    	})
	    	.filter(dto -> dto != null)
	    	.toList();
		return responseList;
	}

	@Override
	public BudgetResponseDTO updatedBudget(BudgetRequestDTO request) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public BudgetResponseDTO updateRate(BudgetResponseDTO response) {
		
		return null;
	}

}
