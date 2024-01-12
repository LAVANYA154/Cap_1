package com.example.demo.model;

import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.UniqueConstraint;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
public class requestSoftware {
	
	private String username;
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long requestid;
	private Long id;
	private String name;
	private String description;
	private Long cost;
	private String vendorName;
	private LocalDate expiryDate;
	private LocalDate systemDate;
	@Column(nullable = false)
    private int validity;
	@Column(nullable = false)
	private boolean status;
	private String category;

    

}
