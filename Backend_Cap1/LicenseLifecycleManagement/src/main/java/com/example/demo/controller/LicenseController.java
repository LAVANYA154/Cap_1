package com.example.demo.controller;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.demo.model.License;
import com.example.demo.service.LicenseService;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/licenses")
@CrossOrigin(origins="http://localhost:4200")
public class LicenseController {
    @Autowired
    private LicenseService licenseService;
    
    //get all licenses
    @GetMapping("/getlicense")
    public ResponseEntity<List<License>> getAllLicenses() {
        List<License> licenses = licenseService.getAllLicenses();
        return new ResponseEntity<>(licenses, HttpStatus.OK);
    }
    
    @CrossOrigin(origins="http://localhost:4200")
    @GetMapping("/{id}")
    public ResponseEntity<License> getLicenseById(@PathVariable Long id) {
        Optional<License> license = licenseService.getLicenseById(id);
        if (license.isPresent()) {
            return new ResponseEntity<>(license.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    //add the licenses    
    @PostMapping("/addlicense")
    public ResponseEntity<License> addLicense(@RequestBody License license) {
        License createdLicense = licenseService.addLicense(license);
        return new ResponseEntity<>(createdLicense, HttpStatus.CREATED);
    }
    
    //update the licenses    
    @PutMapping("/updatelicense")
    public License updateLicense( @RequestBody License updatedLicense) {
        return licenseService.updateLicense(updatedLicense);
    }
    
    //delete licenses    
    @DeleteMapping("deletelicense/{id}")
    public ResponseEntity<Void> deleteLicense(@PathVariable Long id) {
        licenseService.deleteLicense(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
    
    @GetMapping("/getSoftwaresCount")
    public int getSoftwaresCount() {
    	return licenseService.getSoftwaresCount();
    }
    
    @GetMapping("/getDevicesCount")
    public int getDeviceCount() {
    	return licenseService.getDeviceCount();
    }
    
       }
