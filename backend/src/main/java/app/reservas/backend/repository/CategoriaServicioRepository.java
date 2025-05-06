package app.reservas.backend.repository;

import app.reservas.backend.entity.CategoriaServicio;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CategoriaServicioRepository extends JpaRepository<CategoriaServicio, Integer> {
}