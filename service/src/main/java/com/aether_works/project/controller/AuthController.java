package com.aether_works.project.controller;

import com.aether_works.project.models.UserModel;
import com.aether_works.project.security.JwtService;
import com.aether_works.project.services.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    private final UserService userService;
    private final JwtService jwtService;
    private final PasswordEncoder passwordEncoder;

    public AuthController(UserService userService, JwtService jwtService, PasswordEncoder passwordEncoder) {
        this.userService = userService;
        this.jwtService = jwtService;
        this.passwordEncoder = passwordEncoder;
    }

    // 🔐 LOGIN ----------------------------------------------------
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> request) {
        String email = request.get("email");
        String password = request.get("password");

        return userService.findByEmail(email)
                .filter(user -> passwordEncoder.matches(password, user.getPassword()))
                .map(user -> {
                    String token = jwtService.generateToken(email);
                    Map<String, Object> response = new HashMap<>();
                    response.put("token", token);

                    Map<String, Object> userData = new HashMap<>();
                    userData.put("id", user.getId());
                    userData.put("name", user.getName());
                    userData.put("email", user.getEmail());

                    response.put("user", userData);
                    return ResponseEntity.ok(response);
                })
                .orElse(ResponseEntity.status(401).body(Map.of("error", "Credenciais inválidas.")));
    }

    // 🆕 REGISTER -------------------------------------------------
    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody UserModel user) {
        // Verifica se já existe e-mail cadastrado
        if (userService.findByEmail(user.getEmail()).isPresent()) {
            return ResponseEntity
                    .status(HttpStatus.CONFLICT)
                    .body(Map.of("error", "E-mail já cadastrado."));
        }

        // Criptografa a senha e salva
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        UserModel savedUser = userService.save(user);

        // Gera token automático após cadastro
        String token = jwtService.generateToken(savedUser.getEmail());

        // Monta a resposta
        Map<String, Object> response = new HashMap<>();
        response.put("token", token);

        Map<String, Object> userData = new HashMap<>();
        userData.put("id", savedUser.getId());
        userData.put("name", savedUser.getName());
        userData.put("email", savedUser.getEmail());

        response.put("user", userData);

        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }
}
