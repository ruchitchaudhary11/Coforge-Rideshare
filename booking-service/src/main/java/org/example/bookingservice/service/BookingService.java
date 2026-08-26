package org.example.bookingservice.service;

import org.example.bookingservice.client.NotificationClient;
import org.example.bookingservice.client.RideClient;
import org.example.bookingservice.dto.BookingRequest;
import org.example.bookingservice.dto.BookingResponse;
import org.example.bookingservice.dto.NotificationRequest;
import org.example.bookingservice.dto.RideResponse;
import org.example.bookingservice.entity.Booking;
import org.example.bookingservice.repository.BookingRepository;
import org.springframework.stereotype.Service;
import org.example.bookingservice.client.UserClient;
import org.example.bookingservice.dto.UserResponse;

import java.util.List;

@Service
public class BookingService {

    private final BookingRepository bookingRepository;
    private final RideClient rideClient;
    private final NotificationClient notificationClient;
    private final UserClient userClient;

    public BookingService(
            BookingRepository bookingRepository,
            RideClient rideClient,
            NotificationClient notificationClient,
            UserClient userClient) {

        this.bookingRepository = bookingRepository;
        this.rideClient = rideClient;
        this.notificationClient = notificationClient;
        this.userClient = userClient;
    }

    public BookingResponse createBooking(BookingRequest request) {

        // Get ride
        RideResponse ride =
                rideClient.getRideById(request.getRideId());

        if (ride == null) {
            throw new RuntimeException("Ride not found");
        }
        if (ride.getDriverId().equals(request.getPassengerId())) {
    throw new RuntimeException("You cannot book your own ride");
}

        if (ride.getAvailableSeats() == null ||
                ride.getAvailableSeats() <= 0) {

            throw new RuntimeException("No seats available");
        }

        // Reserve one seat
        rideClient.bookSeat(request.getRideId());

        // Create booking
        Booking booking = new Booking();

        booking.setRideId(request.getRideId());
        booking.setPassengerId(request.getPassengerId());
        booking.setStatus("CONFIRMED");

        Booking savedBooking =
                bookingRepository.save(booking);

        UserResponse passenger =
        userClient.getUserById(request.getPassengerId());

if (passenger == null) {
    throw new RuntimeException("Passenger not found");
}

NotificationRequest notificationRequest =
        new NotificationRequest(
                passenger.getEmail(),
                "Ride Booking Confirmed",
                "Hi " + passenger.getName()
                        + ", your ride booking has been confirmed successfully."
        );

        notificationClient.sendNotification(notificationRequest);

        return new BookingResponse(
                savedBooking.getId(),
                savedBooking.getRideId(),
                savedBooking.getPassengerId(),
                savedBooking.getStatus()
        );
    }

    // Get bookings of a passenger
    public List<BookingResponse> getBookingsByPassenger(Long passengerId) {

        List<Booking> bookings =
                bookingRepository.findByPassengerId(passengerId);

        return bookings.stream()
                .map(booking -> new BookingResponse(
                        booking.getId(),
                        booking.getRideId(),
                        booking.getPassengerId(),
                        booking.getStatus()
                ))
                .toList();
    }
}