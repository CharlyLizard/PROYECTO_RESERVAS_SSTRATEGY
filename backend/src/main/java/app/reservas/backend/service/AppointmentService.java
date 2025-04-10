package app.reservas.backend.service;

import app.reservas.backend.dto.AppointmentDTO;
import app.reservas.backend.entity.Appointment;
import app.reservas.backend.entity.Client;
import app.reservas.backend.repository.AppointmentRepository;
import app.reservas.backend.repository.ClientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AppointmentService {

    @Autowired
    private AppointmentRepository appointmentRepository;

    @Autowired
    private ClientRepository clientRepository;

    public List<Appointment> getAllAppointments() {
        return appointmentRepository.findAll();
    }

    public Appointment createAppointment(AppointmentDTO appointmentDTO) {
        Client client = clientRepository.findById(appointmentDTO.getClientId())
                .orElseThrow(() -> new RuntimeException("Client not found"));

        Appointment appointment = new Appointment();
        appointment.setClient(client);
        appointment.setDate(appointmentDTO.getDate());
        appointment.setTime(appointmentDTO.getTime());
        appointment.setTimezone(appointmentDTO.getTimezone());
        appointment.setService(appointmentDTO.getService());
        appointment.setNotes(appointmentDTO.getNotes());

        return appointmentRepository.save(appointment);
    }
}