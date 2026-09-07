package org.example.rideservice.service;

import org.example.rideservice.dto.RideRequest;
import org.example.rideservice.entity.Ride;
import org.example.rideservice.exception.RideNotFoundException;
import org.example.rideservice.repository.RideRepository;
import org.springframework.stereotype.Service;
import org.example.rideservice.client.UserClient;
import org.example.rideservice.dto.UserResponse;

import java.util.List;

@Service
public class RideService {

    private final RideRepository rideRepository;

    private final UserClient userClient;

    public RideService(
            RideRepository rideRepository,
            UserClient userClient) {

        this.rideRepository = rideRepository;
        this.userClient = userClient;
    }

    public Ride createRide(RideRequest request) {

        UserResponse driver = userClient.getUserById(request.getDriverId());

        Ride ride = new Ride();

        ride.setDriverId(driver.getId());

        ride.setSource(request.getSource());
        ride.setSourceLatitude(request.getSourceLatitude());
        ride.setSourceLongitude(request.getSourceLongitude());

        ride.setDestination(request.getDestination());
        ride.setDestinationLatitude(request.getDestinationLatitude());
        ride.setDestinationLongitude(request.getDestinationLongitude());

        ride.setDepartureTime(request.getDepartureTime());
        ride.setAvailableSeats(request.getAvailableSeats());
        ride.setPrice(request.getPrice());

        return rideRepository.save(ride);
    }

    public List<Ride> getAllRides() {
        return rideRepository.findAll();
    }

    public Ride getRideById(Long id) {

        return rideRepository.findById(id)
                .orElseThrow(() -> new RideNotFoundException(id));
    }

    public Ride updateRide(Long id, RideRequest request) {

        Ride existingRide = rideRepository.findById(id)
                .orElseThrow(() -> new RideNotFoundException(id));

        existingRide.setDriverId(request.getDriverId());

        existingRide.setSource(request.getSource());
        existingRide.setSourceLatitude(request.getSourceLatitude());
        existingRide.setSourceLongitude(request.getSourceLongitude());

        existingRide.setDestination(request.getDestination());
        existingRide.setDestinationLatitude(request.getDestinationLatitude());
        existingRide.setDestinationLongitude(request.getDestinationLongitude());

        existingRide.setDepartureTime(request.getDepartureTime());
        existingRide.setAvailableSeats(request.getAvailableSeats());
        existingRide.setPrice(request.getPrice());

        return rideRepository.save(existingRide);
    }

    public void deleteRide(Long id) {

        Ride existingRide = rideRepository.findById(id)
                .orElseThrow(() -> new RideNotFoundException(id));

        rideRepository.delete(existingRide);
    }

    public Ride bookSeat(Long id) {

        Ride ride = rideRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Ride not found"));

        if (ride.getAvailableSeats() <= 0) {
            throw new RuntimeException("No seats available");
        }

        ride.setAvailableSeats(ride.getAvailableSeats() - 1);

        return rideRepository.save(ride);
    }

    public List<Ride> getRidesByDriver(Long driverId) {

        return rideRepository.findByDriverId(driverId);
    }
}