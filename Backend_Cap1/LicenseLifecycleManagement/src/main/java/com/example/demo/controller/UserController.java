package com.example.demo.controller;
import org.springframework.beans.factory.annotation.Autowired;


import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.example.demo.model.requestSoftware;
import com.example.demo.service.EmailService;
import com.example.demo.service.requestService;

import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
@CrossOrigin(origins="http://localhost:4200")
@RestController
@RequestMapping("/api/request")
public class UserController {
    @Autowired
    requestService requestSoftwareService;
    
    
    @PostMapping("/create")
        public ResponseEntity<requestSoftware> createRequestSoftware(@RequestBody requestSoftware requestSoftware) {
            // Check if a record with the same username and ID exists
            requestSoftware createdRequestSoftware = requestSoftwareService.createrequestSoftware(requestSoftware);

            if (createdRequestSoftware != null) {
                // If a new record was created, return it with a 201 Created status
                return new ResponseEntity<>(createdRequestSoftware, HttpStatus.CREATED);
            } else {
                // Handle the case where a duplicate record is not saved (e.g., return a conflict status)
                return new ResponseEntity<>(HttpStatus.CONFLICT);
            }
        }

    
    
    @GetMapping("/activateuser")
    public ResponseEntity<List<requestSoftware>> getAllrequestSoftware(){
    	List<requestSoftware> activateuser=requestSoftwareService.getAllrequestSoftware();
        return new ResponseEntity<>(activateuser, HttpStatus.OK);
    }
    
    
    @PutMapping("/updatedetails")
    public ResponseEntity<requestSoftware> updateRequestSoftware(@RequestBody requestSoftware requestSoftware) {
        // Get the current system date
        LocalDate currentSystemDate = LocalDate.now();
        
        // Calculate the new expiry date by adding the validity to the current system date
        LocalDate newExpiryDate = currentSystemDate.plusDays(requestSoftware.getValidity());
        
        // Update the system date and expiry date
        requestSoftware.setSystemDate(currentSystemDate);
        requestSoftware.setExpiryDate(newExpiryDate);
        requestSoftware.setStatus(true);
        // Update the requestSoftware object in the database
        requestSoftware = requestSoftwareService.updateRequestSoftware(requestSoftware);
        
        if (requestSoftware != null) {
            return new ResponseEntity<>(requestSoftware, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        
    }
    
    @PutMapping("/renewal")
    public ResponseEntity<requestSoftware> userRenewalLicense(@RequestBody requestSoftware requestSoftware) {
    	requestSoftware renewedRequestSoftware = requestSoftwareService.renewUserLicense(requestSoftware);
        if (renewedRequestSoftware != null) {
            return new  ResponseEntity<>(renewedRequestSoftware,HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
    
    @DeleteMapping("/delete/{id}/{username}")
    public ResponseEntity<Void> userDeleteLicense(@PathVariable Long id, @PathVariable String username) {
        boolean deleted = requestSoftwareService.deleteUserLicense(id, username);

        if (deleted) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
    
     @GetMapping("/activateduser")
     public ResponseEntity<List<requestSoftware>> getActivatedrequestSoftware(){
     	List<requestSoftware> activateduser=requestSoftwareService.getActivatedrequestSoftware();
         return new ResponseEntity<>(activateduser, HttpStatus.OK);
     }
     
    // to get no.of.employees based on license
 	@GetMapping("/getSoftwareCount")
     public Map<String, Long> getSoftwareCount() {
         return requestSoftwareService.getSoftwareCount();
     }
 	//cards
 	@GetMapping("/getActivatedUserCount")
 	public int getActivatedUserCount() {
 		return requestSoftwareService.getActivatedUserCount();
 	}
 	@GetMapping("/getUnactivatedUserCount")
 	public int getUnactivatedUserCount() {
 		return requestSoftwareService.getUnActivatedUserCount();
 	}


 	@PostMapping("/sendEmail")
 	public ResponseEntity<Map<String, String>> requestOTP(@RequestBody Map<String,String> requestBody) {
 	    String email = requestBody.get("mail");
 	    System.out.println("Email id is "+email);
    	System.out.println("this is from the send email");
    	System.out.println(requestBody);
 	    String licenseKey = requestSoftwareService.generateLicenseKey();
 	    System.out.println(licenseKey);
// 	    requestSoftwareService.sendLicenseKey(email, licenseKey);
 	    if (requestSoftwareService.sendLicenseKey(email, licenseKey) ){
 	    	   Map<String, String> response = new HashMap<>();
 	           response.put("message", "Request Accepted");
 	           return ResponseEntity.ok(response);
 	    }
		return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
	}
}