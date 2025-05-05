package app.reservas.backend.repository;

import app.reservas.backend.entity.Admin;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AdminRepository extends JpaRepository<Admin, Long> {
    Admin findByNombreUsuario(String nombreUsuario);
}