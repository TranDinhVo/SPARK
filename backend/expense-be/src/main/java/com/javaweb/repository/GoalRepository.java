package com.javaweb.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.javaweb.entity.GoalEntity;
import com.javaweb.model.response.GoalResponseDTO;
import com.javaweb.repository.custom.GoalRepositoryCustom;

public interface GoalRepository extends JpaRepository<GoalEntity, Long>, GoalRepositoryCustom{
	List<GoalEntity> findByUserGoal_Id(Long userId);
}
