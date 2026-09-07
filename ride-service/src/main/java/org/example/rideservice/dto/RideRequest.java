package org.example.rideservice.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDateTime;

public class RideRequest {

    @NotNull(message = "Driver ID is required")
    private Long driverId;

    @NotBlank(message = "Source is required")
    private String source;

    @NotNull(message = "Source latitude is required")
    private Double sourceLatitude;

    @NotNull(message = "Source longitude is required")
    private Double sourceLongitude;

    @NotBlank(message = "Destination is required")
    private String destination;

    @NotNull(message = "Destination latitude is required")
    private Double destinationLatitude;

    @NotNull(message = "Destination longitude is required")
    private Double destinationLongitude;

    @NotNull(message = "Departure time is required")
    private LocalDateTime departureTime;

    @NotNull(message = "Available seats are required")
    @Min(value = 1, message = "At least one seat must be available")
    private Integer availableSeats;

    @NotNull(message = "Price is required")
    @Min(value = 0, message = "Price cannot be negative")
    private Double price;

    public RideRequest() {
    }

    public Long getDriverId() {
        return driverId;
    }

    public void setDriverId(Long driverId) {
        this.driverId = driverId;
    }

    public String getSource() {
        return source;
    }

    public void setSource(String source) {
        this.source = source;
    }

    public Double getSourceLatitude() {
        return sourceLatitude;
    }

    public void setSourceLatitude(Double sourceLatitude) {
        this.sourceLatitude = sourceLatitude;
    }

    public Double getSourceLongitude() {
        return sourceLongitude;
    }

    public void setSourceLongitude(Double sourceLongitude) {
        this.sourceLongitude = sourceLongitude;
    }

    public String getDestination() {
        return destination;
    }

    public void setDestination(String destination) {
        this.destination = destination;
    }

    public Double getDestinationLatitude() {
        return destinationLatitude;
    }

    public void setDestinationLatitude(Double destinationLatitude) {
        this.destinationLatitude = destinationLatitude;
    }

    public Double getDestinationLongitude() {
        return destinationLongitude;
    }

    public void setDestinationLongitude(Double destinationLongitude) {
        this.destinationLongitude = destinationLongitude;
    }

    public LocalDateTime getDepartureTime() {
        return departureTime;
    }

    public void setDepartureTime(LocalDateTime departureTime) {
        this.departureTime = departureTime;
    }

    public Integer getAvailableSeats() {
        return availableSeats;
    }

    public void setAvailableSeats(Integer availableSeats) {
        this.availableSeats = availableSeats;
    }

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }
}