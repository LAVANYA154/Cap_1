package com.example.demo.controller;

import com.example.demo.model.Register;
import com.example.demo.service.RegisterService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/register")
@CrossOrigin(origins="http://localhost:4200")
public class RegisterController {
	@Autowired
    RegisterService registerService;

	@PostMapping("/create")
    public Register createRegister(@RequestBody Register register) {
		System.out.println(register);
    	return registerService.createRegister(register);
    }
	
	@GetMapping("/all")
    public List<Register> getAllRegisters() {
        return registerService.getAllRegisters();
    }
	
	@GetMapping("/{id}")
    public Optional<Register> getRegisterById(@PathVariable String id) {
        return registerService.getRegisterById(id);
    }
	
	@DeleteMapping("/delete/{id}")
    public void deleteRegister(@PathVariable String id) {
        registerService.deleteRegister(id);
    }
 
}
