package org.example.bookingservice.client;

import org.example.bookingservice.dto.RideResponse;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;

@FeignClient(name = "ride-service")
public interface RideClient {

    @GetMapping("/rides/{id}")
    RideResponse getRideById(@PathVariable Long id);

    @PutMapping("/rides/{id}/book")
    RideResponse bookSeat(@PathVariable Long id);
}