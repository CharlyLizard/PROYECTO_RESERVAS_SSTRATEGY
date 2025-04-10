package app.reservas.backend.service;

import app.reservas.backend.dto.AppointmentDTO;
import app.reservas.backend.dto.ClientDTO;
import app.reservas.backend.entity.Appointment;
import app.reservas.backend.entity.Client;
import app.reservas.backend.repository.AppointmentRepository;
import app.reservas.backend.repository.ClientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class AppointmentService {

    @Autowired
    private AppointmentRepository appointmentRepository;

    @Autowired
    private ClientRepository clientRepository;

    // Obtener todas las citas como DTOs
    public List<AppointmentDTO> getAllAppointments() {
        List<Appointment> appointments = appointmentRepository.findAll();
        return appointments.stream().map(this::convertToDTO).collect(Collectors.toList());
    }

    // Guardar una cita desde un DTO
    public AppointmentDTO saveAppointment(AppointmentDTO appointmentDTO) {
        // Manejar el cliente
        Client client = clientRepository.findByEmail(appointmentDTO.getClient().getEmail());
        if (client == null) {
            // Crear un nuevo cliente si no existe
            client = convertToEntity(appointmentDTO.getClient());
            client = clientRepository.save(client);
        }

        // Crear la cita
        Appointment appointment = new Appointment();
        appointment.setClient(client);
        appointment.setDate(appointmentDTO.getDate());
        appointment.setTime(appointmentDTO.getTime());
        appointment.setTimezone(appointmentDTO.getTimezone());
        appointment.setService(appointmentDTO.getService());
        appointment.setNotes(appointmentDTO.getNotes());

        // Guardar la cita en la base de datos
        Appointment savedAppointment = appointmentRepository.save(appointment);

        // Convertir la entidad guardada de vuelta a un DTO
        return convertToDTO(savedAppointment);
    }

    // Convertir una entidad Appointment a un DTO
    private AppointmentDTO convertToDTO(Appointment appointment) {
        AppointmentDTO dto = new AppointmentDTO();
        dto.setClient(convertToDTO(appointment.getClient()));
        dto.setDate(appointment.getDate());
        dto.setTime(appointment.getTime());
        dto.setTimezone(appointment.getTimezone());
        dto.setService(appointment.getService());
        dto.setNotes(appointment.getNotes());
        return dto;
    }

    // Convertir una entidad Client a un DTO
    private ClientDTO convertToDTO(Client client) {
        ClientDTO dto = new ClientDTO();
        dto.setId(client.getId());
        dto.setName(client.getName());
        dto.setEmail(client.getEmail());
        dto.setPhone(client.getPhone());
        dto.setAddress(client.getAddress());
        dto.setCity(client.getCity());
        dto.setPostalCode(client.getPostalCode());
        return dto;
    }

    // Convertir un DTO a una entidad Client
    private Client convertToEntity(ClientDTO dto) {
        Client client = new Client();
        client.setName(dto.getName());
        client.setEmail(dto.getEmail());
        client.setPhone(dto.getPhone());
        client.setAddress(dto.getAddress());
        client.setCity(dto.getCity());
        client.setPostalCode(dto.getPostalCode());
        return client;
    }
}