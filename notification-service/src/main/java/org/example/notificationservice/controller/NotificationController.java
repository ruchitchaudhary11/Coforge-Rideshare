package org.example.notificationservice.controller;

import org.example.notificationservice.dto.NotificationRequest;
import org.example.notificationservice.service.NotificationService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/notifications")
public class NotificationController {

    private final NotificationService notificationService;

    public NotificationController(NotificationService notificationService) {
        this.notificationService = notificationService;
    }

    @PostMapping
    public ResponseEntity<String> sendNotification(
            @RequestBody NotificationRequest request) {

        String response =
                notificationService.sendNotification(request);

        return ResponseEntity.ok(response);
    }
}