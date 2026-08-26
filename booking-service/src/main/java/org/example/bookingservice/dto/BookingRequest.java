package org.example.bookingservice.dto;

import jakarta.validation.constraints.NotNull;

public class BookingRequest {

    @NotNull
    private Long rideId;

    @NotNull
    private Long passengerId;

    public BookingRequest() {
    }

    public Long getRideId() {
        return rideId;
    }

    public void setRideId(Long rideId) {
        this.rideId = rideId;
    }

    public Long getPassengerId() {
        return passengerId;
    }

    public void setPassengerId(Long passengerId) {
        this.passengerId = passengerId;
    }
}