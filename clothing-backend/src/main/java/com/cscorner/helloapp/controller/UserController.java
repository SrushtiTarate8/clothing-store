package com.cscorner.helloapp.controller;

import com.cscorner.helloapp.model.User;
import com.cscorner.helloapp.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    // ─── SIGNUP ───────────────────────────────────────────────────
    @PostMapping("/signup")
    public ResponseEntity<Map<String, Object>> signup(@RequestBody User user) {
        Map<String, Object> response = new HashMap<>();

        if (userRepository.existsByEmail(user.getEmail())) {
            response.put("success", false);
            response.put("message", "Email already registered");
            return ResponseEntity.badRequest().body(response);
        }

        // NOTE: In production, hash the password (e.g. BCrypt)
        User saved = userRepository.save(user);

        response.put("success", true);
        response.put("message", "Account created successfully");
        response.put("userId", saved.getId());
        response.put("name", saved.getName());
        response.put("email", saved.getEmail());
        return ResponseEntity.ok(response);
    }

    // ─── LOGIN ────────────────────────────────────────────────────
    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> login(@RequestBody Map<String, String> creds) {
        Map<String, Object> response = new HashMap<>();
        String email = creds.get("email");
        String password = creds.get("password");

        Optional<User> userOpt = userRepository.findByEmail(email);

        if (userOpt.isEmpty() || !userOpt.get().getPassword().equals(password)) {
            response.put("success", false);
            response.put("message", "Invalid email or password");
            return ResponseEntity.status(401).body(response);
        }

        User user = userOpt.get();
        response.put("success", true);
        response.put("userId", user.getId());
        response.put("name", user.getName());
        response.put("email", user.getEmail());
        response.put("phone", user.getPhone());
        return ResponseEntity.ok(response);
    }

    // ─── GET PROFILE ──────────────────────────────────────────────
    @GetMapping("/profile/{id}")
    public ResponseEntity<Map<String, Object>> getProfile(@PathVariable Long id) {
        Map<String, Object> response = new HashMap<>();
        Optional<User> userOpt = userRepository.findById(id);

        if (userOpt.isEmpty()) {
            response.put("success", false);
            response.put("message", "User not found");
            return ResponseEntity.status(404).body(response);
        }

        User user = userOpt.get();
        response.put("success", true);
        response.put("userId", user.getId());
        response.put("name", user.getName());
        response.put("email", user.getEmail());
        response.put("phone", user.getPhone());
        return ResponseEntity.ok(response);
    }

    // ─── UPDATE PROFILE ───────────────────────────────────────────
    @PutMapping("/profile/{id}")
    public ResponseEntity<Map<String, Object>> updateProfile(
            @PathVariable Long id,
            @RequestBody Map<String, String> updates) {

        Map<String, Object> response = new HashMap<>();
        Optional<User> userOpt = userRepository.findById(id);

        if (userOpt.isEmpty()) {
            response.put("success", false);
            response.put("message", "User not found");
            return ResponseEntity.status(404).body(response);
        }

        User user = userOpt.get();
        if (updates.containsKey("name"))  user.setName(updates.get("name"));
        if (updates.containsKey("phone")) user.setPhone(updates.get("phone"));
        userRepository.save(user);

        response.put("success", true);
        response.put("message", "Profile updated");
        return ResponseEntity.ok(response);
    }
}