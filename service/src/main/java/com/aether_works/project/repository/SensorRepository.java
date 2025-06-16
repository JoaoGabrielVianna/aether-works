package com.aether_works.project.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.aether_works.project.models.SensorModel;

public interface SensorRepository extends JpaRepository<SensorModel, Long> {
    
}
