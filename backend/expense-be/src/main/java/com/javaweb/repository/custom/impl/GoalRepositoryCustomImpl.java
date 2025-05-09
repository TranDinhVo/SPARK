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
		// Modified SQL to get icon_url directly from goal table instead of joining with category
		StringBuilder sql = new StringBuilder(
		    "SELECT g.id, g.user_id, g.target_amount, g.created_at, g.deadline, g.goal_name, g.status, " +
		    "COALESCE(SUM(t.amount), 0) AS currentAmount, g.icon_url " +
		    "FROM goal AS g " +
		    "LEFT JOIN transaction AS t ON g.id = t.goal_id ");
		
		StringBuilder where = new StringBuilder(" WHERE 1=1 ");
		normalQuery(builder,where);
		specialQuery(builder,where);
		sql.append(where).append(" GROUP BY g.id;");
		
		// Log SQL query for debugging
		System.out.println("Executing SQL query: " + sql.toString());
		
		try {
			Query query = entityManager.createNativeQuery(sql.toString());
			List<Object[]> results = query.getResultList();
			List<GoalResponseDTO> responseList = results.stream().map(row -> {
				try {
					GoalResponseDTO dto = goalConverter.mapToGoalResponseDTO(row);
					return dto;
				} catch (Exception e) {
					e.printStackTrace();
					return null;
				}
			})
			.filter(dto -> dto != null)
			.toList();
			return responseList;
		} catch (Exception e) {
			e.printStackTrace();
			System.err.println("SQL Error: " + e.getMessage());
			
			// Kiểm tra cấu trúc bảng goal
			try {
				Query descQuery = entityManager.createNativeQuery("DESC goal");
				List<Object[]> columns = descQuery.getResultList();
				System.out.println("Goal table structure:");
				for (Object[] col : columns) {
					System.out.println(col[0] + " - " + col[1]);
				}
			} catch(Exception ex) {
				System.err.println("Could not get table structure: " + ex.getMessage());
			}
			
			return List.of();
		}
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
		try {
			// Simplified query that doesn't need to get iconUrl since it's directly on the goal entity
			StringBuilder sql = new StringBuilder(
					"SELECT COALESCE(SUM(t.amount), 0) AS currentAmount, g.icon_url " +
					"FROM goal AS g " +
					"LEFT JOIN transaction AS t ON g.id = t.goal_id " +
					"WHERE g.id = " + response.getId() + " " +
					"GROUP BY g.id, g.icon_url");
			
			System.out.println("Executing getCurrentAmount SQL query: " + sql.toString());
			
			Query query = entityManager.createNativeQuery(sql.toString());
			List<Object[]> result = query.getResultList();
			
			if (!result.isEmpty()) {
				Object[] row = result.get(0);
				BigDecimal currentAmount = (BigDecimal) row[0];
				String iconUrl = (String) row[1];
				
				response.setCurrentAmount(currentAmount != null ? currentAmount : BigDecimal.ZERO);
				
				// Only set iconUrl if it's not already set
				if (response.getIconUrl() == null && iconUrl != null) {
					response.setIconUrl(iconUrl);
				}
			} else {
				response.setCurrentAmount(BigDecimal.ZERO);
			}
		} catch (Exception e) {
			e.printStackTrace();
			System.err.println("SQL Error in getCurrentAmount: " + e.getMessage());
			response.setCurrentAmount(BigDecimal.ZERO);
		}
	}	 
}