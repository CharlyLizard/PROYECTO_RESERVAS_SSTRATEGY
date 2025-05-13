// filepath: backend/src/main/java/app/reservas/backend/repository/SecretarioRepository.java
package app.reservas.backend.repository;

import app.reservas.backend.entity.Secretario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List; // Asegúrate de importar List
import java.util.Optional; // Asegúrate de importar Optional

@Repository
public interface SecretarioRepository extends JpaRepository<Secretario, Long> {
    // Encuentra un secretario por el ID del proveedor al que está asignado
    Optional<Secretario> findByProveedor_Id(Long proveedorId);

    // Encuentra todos los secretarios que no están asignados a ningún proveedor
    List<Secretario> findByProveedorIsNull();

    // Encuentra secretarios no asignados O el que está asignado al proveedorId dado (para el dropdown de edición)
    List<Secretario> findByProveedor_IdOrProveedorIsNull(Long proveedorId);
}