package com.javaweb.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.javaweb.entity.GoalEntity;
import com.javaweb.repository.custom.GoalRepositoryCustom;

public interface GoalRepository extends JpaRepository<GoalEntity, Long>, GoalRepositoryCustom{

}
