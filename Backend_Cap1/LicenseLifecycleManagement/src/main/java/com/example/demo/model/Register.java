package com.example.demo.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Entity
public class Register {
	
	private String firstName;
	private String lastName;
	private String email;
	private String password;
	private String cnfrmpassword;
	@Id
	private String employeeID;
	private String contactNumber;
	
	
	@Override
	public String toString() {
		return "Register [FirstName=" + firstName + ", LastName=" + lastName + ", EMail=" + email + ", Password="
				+ password + ", Cnfrmpassword=" + cnfrmpassword + ", EmployeeID=" + employeeID + ", ContactNumber="
				+ contactNumber + "]";
	}
	
	

}
