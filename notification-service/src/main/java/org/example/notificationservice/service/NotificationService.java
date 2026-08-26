package org.example.notificationservice.service;

import org.example.notificationservice.dto.NotificationRequest;
import org.springframework.stereotype.Service;

@Service
public class NotificationService {

    public String sendNotification(NotificationRequest request) {

        System.out.println("=================================");
        System.out.println("EMAIL NOTIFICATION");
        System.out.println("To      : " + request.getEmail());
        System.out.println("Subject : " + request.getSubject());
        System.out.println("Message : " + request.getMessage());
        System.out.println("=================================");

        return "Notification sent successfully";
    }
}