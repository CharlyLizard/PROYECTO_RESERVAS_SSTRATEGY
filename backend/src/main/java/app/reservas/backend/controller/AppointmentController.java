package app.reservas.backend.controller;

import app.reservas.backend.dto.AppointmentDTO;
import app.reservas.backend.service.AppointmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/appointments")
public class AppointmentController {

    private final AppointmentService appointmentService;

    @Autowired
    public AppointmentController(AppointmentService appointmentService) {
        this.appointmentService = appointmentService;
    }


    @GetMapping("/details")
    public ResponseEntity<List<Map<String, Object>>> getAllAppointmentsWithDetails() {
        List<Map<String, Object>> appointments = appointmentService.getAllAppointmentsWithDetails();
        return ResponseEntity.ok(appointments);
    }

    // Obtener todas las citas
    @GetMapping
    public ResponseEntity<List<AppointmentDTO>> getAllAppointments() {
        List<AppointmentDTO> appointments = appointmentService.getAllAppointments();
        return ResponseEntity.ok(appointments);
    }

    // Crear una nueva cita
    @PostMapping
    public ResponseEntity<AppointmentDTO> createAppointment(@RequestBody AppointmentDTO appointmentDTO) {
        AppointmentDTO savedAppointment = appointmentService.saveAppointment(appointmentDTO);
        return ResponseEntity.ok(savedAppointment);
    }
    @GetMapping("/client/{clientId}")
    public ResponseEntity<List<AppointmentDTO>> getAppointmentsByClientId(@PathVariable Long clientId) {
        List<AppointmentDTO> appointments = appointmentService.getAppointmentsByClientId(clientId);
        return ResponseEntity.ok(appointments);
    }
}