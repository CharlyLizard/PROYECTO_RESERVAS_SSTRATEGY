package app.reservas.backend.repository;

import app.reservas.backend.entity.Coche;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CocheRepository extends JpaRepository<Coche, String> {
}