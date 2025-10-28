package com.aether_works.project.controller;

import com.aether_works.project.models.UserModel;
import com.aether_works.project.services.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "*")
public class UserController {

    private final UserService service;

    public UserController(UserService service) {
        this.service = service;
    }

    @GetMapping
    public List<UserModel> getAll() {
        return service.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserModel> getById(@PathVariable Long id) {
        return service.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public UserModel create(@RequestBody UserModel user) {
        user.setPassword(new BCryptPasswordEncoder().encode(user.getPassword()));
        return service.save(user);
    }


    @PutMapping("/{id}")
    public ResponseEntity<UserModel> update(@PathVariable Long id, @RequestBody UserModel updated) {
        return service.findById(id)
                .map(existing -> {
                    existing.setName(updated.getName());
                    existing.setEmail(updated.getEmail());
                    existing.setPassword(updated.getPassword());
                    return ResponseEntity.ok(service.save(existing));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
}
