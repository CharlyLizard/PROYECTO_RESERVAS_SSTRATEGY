package app.reservas.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import app.reservas.backend.entity.User;

import java.util.Optional;

// Siendo una interfaz, no necesitas la anotación @Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<app.reservas.backend.entity.User> findByUsername(String username);
}
