package com.javaweb.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.javaweb.entity.BudgetEntity;
import com.javaweb.repository.custom.BudgetRepositoryCustom;

public interface BudgetRepository extends JpaRepository<BudgetEntity, Long>,BudgetRepositoryCustom {

}