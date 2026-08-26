package org.example.bookingservice.controller;

import jakarta.validation.Valid;
import org.example.bookingservice.dto.BookingRequest;
import org.example.bookingservice.dto.BookingResponse;
import org.example.bookingservice.service.BookingService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/bookings")
public class BookingController {

    private final BookingService bookingService;

    public BookingController(BookingService bookingService) {
        this.bookingService = bookingService;
    }

    // Create booking
    @PostMapping
    public ResponseEntity<BookingResponse> createBooking(
            @Valid @RequestBody BookingRequest request) {

        BookingResponse response =
                bookingService.createBooking(request);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(response);
    }

    // Get bookings of a passenger
    @GetMapping("/passenger/{passengerId}")
    public ResponseEntity<List<BookingResponse>> getBookingsByPassenger(
            @PathVariable Long passengerId) {

        List<BookingResponse> bookings =
                bookingService.getBookingsByPassenger(passengerId);

        return ResponseEntity.ok(bookings);
    }
}