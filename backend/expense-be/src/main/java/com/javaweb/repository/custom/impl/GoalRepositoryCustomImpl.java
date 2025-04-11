package com.javaweb.repository.custom.impl;

import java.lang.reflect.Field;
import java.math.BigDecimal;
import java.sql.Timestamp;
import java.time.Instant;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.javaweb.Builder.GoalSearchBuilder;
import com.javaweb.converter.GoalConverter;
import com.javaweb.entity.GoalEntity;
import com.javaweb.enums.GoalStatusEnum;
import com.javaweb.model.response.GoalResponseDTO;
import com.javaweb.repository.custom.GoalRepositoryCustom;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.Query;

@Repository
public class GoalRepositoryCustomImpl implements GoalRepositoryCustom{
	@Autowired
	private GoalConverter goalConverter;
	
	
	@PersistenceContext
    private EntityManager entityManager;
	
	 public void normalQuery(GoalSearchBuilder builder, StringBuilder where) {
		 try {
			 Field[] fields = GoalSearchBuilder.class.getDeclaredFields();
			 for (Field item : fields) {
				 item.setAccessible(true);
				 String fieldName = item.getName();
				 Object value = item.get(builder);

				 if (!fieldName.equals("amount_from") && !fieldName.equals("amount_to") && !fieldName.equals("start_at") && !fieldName.equals("end_at") && value != null) {
					 if (item.getType().equals(String.class)) {
						 where.append(" AND g.").append(fieldName).append(" LIKE '%").append(value).append("%' ");
					 } else if (item.getType().equals(Long.class)) {
						 where.append(" AND g.").append(fieldName).append(" = ").append(value);
					 } else if (item.getType().equals(BigDecimal.class)) {
						 where.append(" AND g.").append(fieldName).append(" = ").append(value);
					 } else if (item.getType().isEnum()) {
						 where.append(" AND g.").append(fieldName).append(" = '").append(value.toString()).append("' ");
					 }
				 }
			 }
		 } catch (Exception e) {
			 e.printStackTrace();
		 }
	 }

	 public void specialQuery(GoalSearchBuilder builder, StringBuilder where) {
		BigDecimal amountFrom = builder.getAmount_from();
    	BigDecimal amountTo = builder.getAmount_to();
    	Instant startAt = builder.getStart_at();
    	Instant endAt = builder.getEnd_at();
    	if(amountFrom != null) {
    		where.append(" AND g.amount >= "+amountFrom);
    	}
    	if(amountTo != null) {
    		where.append(" AND g.amount <= "+amountTo);
    	}
    	
    	if (startAt != null) {
    	   where.append(" AND g.deadline >= '").append(Timestamp.from(startAt).toString()).append("'");
    	}
    	   
    	if (endAt != null) {
    	   where.append(" AND g.deadline <= '").append(Timestamp.from(endAt).toString()).append("'");
    	}
	 }


	@Override
	public List<GoalResponseDTO> getAllGoals(GoalSearchBuilder builder) {
		//Tạo lệnh SQL với điều kiện lọc
		StringBuilder sql = new StringBuilder("SELECT g.*, COALESCE(SUM(t.amount), 0) AS currentAmount FROM goal AS g "
				+ "LEFT JOIN transaction AS t ON g.id = t.goal_id");
		StringBuilder where = new StringBuilder(" WHERE 1=1 ");
		normalQuery(builder,where);
		specialQuery(builder,where);
		sql.append(where).append(" GROUP BY g.id;");
		
		Query query = entityManager.createNativeQuery(sql.toString());
	     List<Object[]> results = query.getResultList();
	     List<GoalResponseDTO> responseList =  results.stream().map(row -> {
	    	    try {
	    	    	 GoalResponseDTO dto = goalConverter
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
	public GoalResponseDTO updateStatus(GoalResponseDTO response) {
		if(response.getStatus().equals(GoalStatusEnum.TAM_DUNG)) return response;
		else if (response.getCurrentAmount() == null || response.getCurrentAmount().compareTo(response.getTargetAmount()) < 0) {
	        if (response.getDeadline() != null && response.getDeadline().isBefore(Instant.now())) {
	        	response.setStatus(GoalStatusEnum.THAT_BAI);
	        } else
	        	response.setStatus(GoalStatusEnum.DANG_THUC_HIEN);
	    }
	    else {
	    	response.setStatus(GoalStatusEnum.HOAN_THANH);
	    }
		return response;
	}
	
	@Override
	public void getCurrentAmount(GoalResponseDTO response) {
		StringBuilder sql = new StringBuilder("SELECT COALESCE(SUM(t.amount), 0) AS currentAmount FROM goal AS g "
				+ " LEFT JOIN transaction AS t ON g.id = t.goal_id ");
		StringBuilder where = new StringBuilder(" WHERE 1=1 AND g.id = ").append(response.getId()).append(" ");
		sql.append(where).append(" GROUP BY g.id;");
		Query query = entityManager.createNativeQuery(sql.toString());
		response.setCurrentAmount((BigDecimal) query.getSingleResult());
	}
	 
}
