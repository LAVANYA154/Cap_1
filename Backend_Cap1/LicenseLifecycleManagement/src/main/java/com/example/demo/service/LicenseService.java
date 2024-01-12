package com.example.demo.service;

import java.util.HashMap;

import java.util.List;
import java.util.Map;
import java.util.Optional;

//import javax.mail.MessagingException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.model.License;
import com.example.demo.repository.LicenseRepository;

import jakarta.mail.MessagingException;

@Service
public class LicenseService {
    @Autowired
    private LicenseRepository licenseRepository;
    public List<License> getAllLicenses() {
        return licenseRepository.findAll();
    }

    public Optional<License> getLicenseById(Long id) {
        return licenseRepository.findById(id);
    }

    public License addLicense(License license) {
        return licenseRepository.save(license);
    }

    public License updateLicense(License updatedLicense) {
            return licenseRepository.save(updatedLicense);
    }
    


    public void deleteLicense(Long id) {
        licenseRepository.deleteById(id);
    }
    public int getSoftwaresCount() {
    	return licenseRepository.findSoftwareCount();
		
    }

	public int getDeviceCount() {
		// TODO Auto-generated method stub
		return licenseRepository.findDeviceCount();
	}

	
}





