package com.example.demo.scheduler;
import java.time.LocalDate;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import com.example.demo.model.requestSoftware;
import com.example.demo.service.EmailService;
import com.example.demo.service.requestService;

@Component
public class EmailScheduler {
	@Autowired
    EmailService emailService;
    @Autowired
    requestService requestservice;
//    at expiry date
    @Scheduled(cron = "0 14 14 * * ?")
    public void sendDueDateReminders() {
        System.out.println("Scheduled mail executed on the expiry date.");
        LocalDate today = LocalDate.now();
        LocalDate dueDateThresholdBefore = today.plusDays(2);
        LocalDate actualExpiryDate = today; // Change this to obtain the actual expiry date
        if (actualExpiryDate.isEqual(today)) {
            // Send a different email for the actual expiry date
            sendExpiryDateEmail();
        }
    }

    private void sendExpiryDateEmail() {
        System.out.println("Sending email for actual expiry date.");
        // Get users with the actual expiry date
        LocalDate today = LocalDate.now();
        List<requestSoftware> usersWithExpiryDateToday = requestservice.getCustomersWithDueDate(today);

        for (requestSoftware user : usersWithExpiryDateToday) {
            try {
                // Build dynamic email content in HTML format
                String subject = "License Expiry Reminder";
                String message = "<html><body>" +
                    "<p>Hi</p> " + 
                    "<p>Your license with ID " + user.getId() + " is expiring today.</p>" +
                    "<p>You can renew or decline your license by visiting our portal.</p>" +
                    "<p>If you wish to renew or decline, please click the following link:</p>" +
                    "<p><a href='http://localhost:4200/renewal'>Renew/Decline License</a></p>" +
                    "</body></html>";

                // Call the email service to send the actual expiry date email
                emailService.sendLicenseExpiryReminder(user.getUsername(), subject, message);
            } catch (Exception e) {
                // Handle email sending exception (log or rethrow if necessary)
                e.printStackTrace();
            }
        }
    }
// before two days of expiry
    @Scheduled(cron = "0 14 14 * * ?") // Schedule at 4 PM daily
    public void sendExpiryDateBeforeReminders() {
        System.out.println("Scheduled mail executed at an interval of 2 days.");
        LocalDate today = LocalDate.now();
        LocalDate dueDateThresholdBefore = today.plusDays(2);
        System.out.println(dueDateThresholdBefore);
        sendRemindersForDueDate(dueDateThresholdBefore);
    }

    private void sendRemindersForDueDate(LocalDate dueDateThreshold) {
        System.out.println("hiii");
        List<requestSoftware> userExpirydate = requestservice.getCustomersWithDueDate(dueDateThreshold);
        for (requestSoftware userWithExpirydate : userExpirydate) {
            try {
                // Build dynamic email content in HTML format
                String subject = "License Expiry Reminder";
                String message = "<html><body>" +
                    "<p>Hello,</p>" +
                    "<p>Your license with ID " + userWithExpirydate.getId() + " is approaching its expiry date on " +
                    userWithExpirydate.getExpiryDate() + ".</p>" +
                    "<p>Please take the necessary actions on the expiry date to renew your license.</p>" +
                    "</body></html>";

                emailService.sendEmail(userWithExpirydate.getUsername(), subject, message);
            } catch (Exception e) {
                // Handle email sending exception (log or rethrow if necessary)
                e.printStackTrace();
            }
        }
    }
    }
    
//    private void sendExpiryDateEmail() {
//        System.out.println("Sending email for actual expiry date.");
//        // Create the email content for the actual expiry date
//        String emailContent = "<html><body>Hi, Your license is expiring today. <form action='http://localhost:4200'><input type='submit' value='Click Here'></form></body></html>";
//
//        // Get users with the actual expiry date
//        LocalDate today = LocalDate.now();
//        List<requestSoftware> usersWithExpiryDateToday = requestservice.getCustomersWithDueDate(today);
//
//        for (requestSoftware user : usersWithExpiryDateToday) {
//            try {
//                // Call the email service to send the actual expiry date email
//                emailService.sendLicenseExpiryReminder(user.getUsername(), "License Expiry Reminder", emailContent);
//            } catch (Exception e) {
//                // Handle email sending exception (log or rethrow if necessary)
//                e.printStackTrace();
//            }
//        }
//    }
 


