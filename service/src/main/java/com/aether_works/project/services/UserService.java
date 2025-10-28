package com.aether_works.project.services;

import com.aether_works.project.models.UserModel;
import com.aether_works.project.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    private final UserRepository repository;

    public UserService(UserRepository repository) {
        this.repository = repository;
    }

    public List<UserModel> findAll() {
        return repository.findAll();
    }

    public Optional<UserModel> findById(Long id) {
        return repository.findById(id);
    }

    public UserModel save(UserModel user) {
        return repository.save(user);
    }

    public void delete(Long id) {
        repository.deleteById(id);
    }

    public Optional<UserModel> findByEmail(String email) {
        return repository.findByEmail(email);
    }
}
