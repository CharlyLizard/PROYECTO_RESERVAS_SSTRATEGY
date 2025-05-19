package app.reservas.backend.repository;

import app.reservas.backend.entity.Proveedor;
import app.reservas.backend.entity.Servicio;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProveedorRepository extends JpaRepository<Proveedor, Long> {
        List<Proveedor> findByServicio(Servicio servicio);

}