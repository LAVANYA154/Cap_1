package com.example.demo.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.example.demo.model.License;

public interface LicenseRepository extends JpaRepository<License, Long> {
	
 @Query(value="select count(category)from license where category='Software'",nativeQuery=true)
	int findSoftwareCount();
 
 @Query(value="select count(category)from license where category='Device'",nativeQuery=true)
	int findDeviceCount();


	// Define license-related data access methods
}