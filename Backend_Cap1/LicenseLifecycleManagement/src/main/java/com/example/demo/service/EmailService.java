package com.example.demo.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;

import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RestController;

 

import jakarta.mail.MessagingException;

import jakarta.mail.internet.MimeMessage;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender javaMailSender;

	public void sendEmail(String username, String subject, String message) throws MessagingException, MessagingException {
		System.out.println("Email sent successfully");
		MimeMessage mimeMessage = javaMailSender.createMimeMessage();
        MimeMessageHelper helper;

        helper = new MimeMessageHelper(mimeMessage, true); // Set to true for HTML content
		helper.setTo(username);
		helper.setSubject(subject);
		helper.setText(message, true); // Set to true for HTML content
		javaMailSender.send(mimeMessage);
	}
	public void sendLicenseExpiryReminder(String username, String subject, String message) throws MessagingException, MessagingException {
		System.out.println("Email at expiry date sent successfully");
		MimeMessage mimeMessage = javaMailSender.createMimeMessage();
        MimeMessageHelper helper;

        helper = new MimeMessageHelper(mimeMessage, true); // Set to true for HTML content
		helper.setTo(username);
		helper.setSubject(subject);
		helper.setText(message, true); // Set to true for HTML content
		javaMailSender.send(mimeMessage);

		
	}
}
