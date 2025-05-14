// filepath: backend/src/main/java/app/reservas/backend/repository/SecretarioRepository.java
package app.reservas.backend.repository;

import app.reservas.backend.entity.Secretario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface SecretarioRepository extends JpaRepository<Secretario, Long> {
    Optional<Secretario> findByProveedor_Id(Long proveedorId);

    List<Secretario> findByProveedorIsNull();

    List<Secretario> findByProveedor_IdOrProveedorIsNull(Long proveedorId);
}