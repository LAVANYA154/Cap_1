// RegisterService.java

package com.example.demo.service;

import com.example.demo.model.License;
import com.example.demo.model.Register;
import com.example.demo.repository.RegisterRepository;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
@Service
public class RegisterService{
	@Autowired
	RegisterRepository registerrepository;
	 public List<Register> getAllRegisters() {
	        return registerrepository.findAll();
	    }

	    public Optional<Register> getRegisterById(String id) {
	        return registerrepository.findById(id);
	    }

	    public Register createRegister(Register register) {
	    	return registerrepository.save(register);
	    }

	    public void deleteRegister(String id) {
	    	registerrepository.deleteById(id);
	    }
    
    // Add more methods as needed for your application

}
