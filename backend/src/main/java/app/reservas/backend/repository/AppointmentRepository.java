package app.reservas.backend.repository;

import app.reservas.backend.entity.Appointment;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AppointmentRepository extends JpaRepository<Appointment, Long> {
        List<Appointment> findByClientId(Long clientId);
        void deleteByClientId(Long clientId);
}