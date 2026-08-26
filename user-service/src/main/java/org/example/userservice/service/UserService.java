package org.example.userservice.service;

import org.example.userservice.dto.UserRequest;
import java.util.List;
import org.example.userservice.entity.User;
import org.example.userservice.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.example.userservice.exception.UserNotFoundException;
import org.example.userservice.dto.LoginRequest;
import org.example.userservice.dto.LoginResponse;

@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public String getHelloMessage() {
        return "Hello from User Service!";
    }

    public User createUser(UserRequest request) {

        User user = new User();

        user.setName(request.getName());
        user.setEmail(request.getEmail());
        user.setPhone(request.getPhone());
        user.setPassword(request.getPassword());

        return userRepository.save(user);
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public User getUserById(Long id) {

        return userRepository.findById(id)
                .orElseThrow(() ->
                        new UserNotFoundException(id));
    }

    public User updateUser(Long id, User updatedUser) {

        User existingUser =
                userRepository.findById(id).orElse(null);

        if (existingUser == null) {
            return null;
        }

        existingUser.setName(updatedUser.getName());
        existingUser.setEmail(updatedUser.getEmail());
        existingUser.setPhone(updatedUser.getPhone());

        return userRepository.save(existingUser);
    }

    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }
    public LoginResponse login(LoginRequest request) {

    User user = userRepository.findByEmail(request.getEmail())
            .orElseThrow(() ->
                    new RuntimeException("Invalid email or password"));

    if (!user.getPassword().equals(request.getPassword())) {
        throw new RuntimeException("Invalid email or password");
    }

    return new LoginResponse(
            user.getId(),
            user.getName(),
            user.getEmail(),
            user.getPhone()
    );
}
}