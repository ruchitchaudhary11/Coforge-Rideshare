package org.example.rideservice.dto;

public class UserResponse {

    private Long id;
    private String name;
    private String email;
    private String phone;

    public UserResponse() {
    }

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getEmail() {
        return email;
    }

    public String getPhone() {
        return phone;
    }
}
