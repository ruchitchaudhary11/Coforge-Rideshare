package org.example.userservice.controller;
import java.util.List;
import org.springframework.web.bind.annotation.PathVariable;
import org.example.userservice.entity.User;
import org.example.userservice.service.UserService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.DeleteMapping;
import jakarta.validation.Valid;
import org.example.userservice.dto.UserRequest;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.example.userservice.dto.LoginRequest;
import org.example.userservice.dto.LoginResponse;

@RestController
// @CrossOrigin(origins = "http://localhost:5173") // Allows requests from this specific origin

public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/users/hello")
    public String hello() {
        return userService.getHelloMessage();
    }

    @PostMapping("/users")
    public User createUser(@Valid @RequestBody UserRequest request) {
        return userService.createUser(request);
    }
    @GetMapping("/users")
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }
    @GetMapping("/users/{id}")
    public User getUserById(@PathVariable Long id) {
        return userService.getUserById(id);
    }
    @PutMapping("/users/{id}")
    public User updateUser(
            @PathVariable Long id,
            @RequestBody User user) {

        return userService.updateUser(id, user);
    }
    @DeleteMapping("/users/{id}")
    public String deleteUser(@PathVariable Long id) {
        userService.deleteUser(id);
        return "User deleted successfully!";
    }
    @PostMapping("/users/login")
    public LoginResponse login(
        @Valid @RequestBody LoginRequest request) {

        return userService.login(request);
}
}