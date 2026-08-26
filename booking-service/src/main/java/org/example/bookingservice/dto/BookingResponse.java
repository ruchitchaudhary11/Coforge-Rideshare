package org.example.bookingservice.dto;

public class BookingResponse {

    private Long id;
    private Long rideId;
    private Long passengerId;
    private String status;

    public BookingResponse() {
    }

    public BookingResponse(
            Long id,
            Long rideId,
            Long passengerId,
            String status) {

        this.id = id;
        this.rideId = rideId;
        this.passengerId = passengerId;
        this.status = status;
    }

    public Long getId() {
        return id;
    }

    public Long getRideId() {
        return rideId;
    }

    public Long getPassengerId() {
        return passengerId;
    }

    public String getStatus() {
        return status;
    }
}