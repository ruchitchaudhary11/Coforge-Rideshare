
package org.example.rideservice.controller;

import jakarta.validation.Valid;
import org.example.rideservice.dto.RideRequest;
import org.example.rideservice.entity.Ride;
import org.example.rideservice.service.RideService;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.List;

@RestController
@RequestMapping("/rides")
//@CrossOrigin(origins = "http://localhost:5173") // Allows requests from this specific origin

public class RideController {

    private final RideService rideService;

    public RideController(RideService rideService) {
        this.rideService = rideService;
    }

    @PostMapping
    public Ride createRide(@Valid @RequestBody RideRequest request) {
        return rideService.createRide(request);
    }

    @GetMapping
    public List<Ride> getAllRides() {
        return rideService.getAllRides();
    }

    @GetMapping("/{id}")
    public Ride getRideById(@PathVariable Long id) {
        return rideService.getRideById(id);
    }
    @GetMapping("/driver/{driverId}")
public List<Ride> getRidesByDriver(
        @PathVariable Long driverId) {

    return rideService.getRidesByDriver(driverId);
}
    @PutMapping("/{id}")
    public Ride updateRide(
            @PathVariable Long id,
            @Valid @RequestBody RideRequest request) {

        return rideService.updateRide(id, request);
    }

    @DeleteMapping("/{id}")
    public String deleteRide(@PathVariable Long id) {

        rideService.deleteRide(id);

        return "Ride deleted successfully!";
    }
    @PutMapping("/{id}/book")
    public Ride bookSeat(@PathVariable Long id) {
        return rideService.bookSeat(id);
    }
}
