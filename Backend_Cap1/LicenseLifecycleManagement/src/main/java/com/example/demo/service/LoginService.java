package com.example.demo.service;

import com.example.demo.model.Login;
import com.example.demo.model.Register;
import com.example.demo.repository.RegisterRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class LoginService {
	private RegisterRepository registerRepository;
	@Autowired
	public LoginService(RegisterRepository registerRepository) {
		this.registerRepository =registerRepository;
	}

	public boolean authenticateUser(Login login) {
    	System.out.println(login.getUserName());
    	System.out.println(registerRepository.findById(login.getUserName()).isPresent());
    	System.out.println(login);
    	Register register = registerRepository.findUser(login.getUserName());
    	System.out.println(register);
    	if(register == null) {
    		System.out.println(register);
    		return false;
    	}
    	else {
    		if((login.getUserName().equals(register.getEmail()))&&(login.getPassword().equals(register.getPassword()))) {
    			return true;
    		}
    		return false;
    	}
    }
}
