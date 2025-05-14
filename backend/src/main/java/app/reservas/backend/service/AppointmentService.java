package app.reservas.backend.service;

import app.reservas.backend.dto.AppointmentDTO;
import app.reservas.backend.dto.ClientDTO;
import app.reservas.backend.entity.Appointment;
import app.reservas.backend.entity.Client;
import app.reservas.backend.entity.Servicio;
import app.reservas.backend.repository.AppointmentRepository;
import app.reservas.backend.repository.ClientRepository;
import app.reservas.backend.repository.ServicioRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class AppointmentService {

    private final AppointmentRepository appointmentRepository;
    private final ClientRepository clientRepository;
    private final ServicioRepository servicioRepository;

    @Autowired
    public AppointmentService(AppointmentRepository appointmentRepository,
                              ClientRepository clientRepository,
                              ServicioRepository servicioRepository) {
        this.appointmentRepository = appointmentRepository;
        this.clientRepository = clientRepository;
        this.servicioRepository = servicioRepository;
    }

    public List<AppointmentDTO> getAllAppointments() {
        List<Appointment> appointments = appointmentRepository.findAll();
        return appointments.stream().map(this::convertToDTO).collect(Collectors.toList());
    }

    public List<AppointmentDTO> getAppointmentsByClientId(Long clientId) {
        List<Appointment> appointments = appointmentRepository.findByClientId(clientId);
        return appointments.stream().map(this::convertToDTO).collect(Collectors.toList());
    }

    public AppointmentDTO saveAppointment(AppointmentDTO appointmentDTO) {
        Client client = clientRepository.findByEmail(appointmentDTO.getClient().getEmail());
        if (client == null) {
            client = convertToEntity(appointmentDTO.getClient());
            client = clientRepository.save(client);
        }

        Appointment appointment = new Appointment();
        appointment.setClient(client);
        appointment.setDate(appointmentDTO.getDate());
        appointment.setTime(appointmentDTO.getTime());
        appointment.setTimezone(appointmentDTO.getTimezone());
        Servicio servicio = servicioRepository.findById(appointmentDTO.getService())
            .orElseThrow(() -> new RuntimeException("Servicio no encontrado"));
        appointment.setService(servicio);
        appointment.setNotes(appointmentDTO.getNotes());

        Appointment savedAppointment = appointmentRepository.save(appointment);

        return convertToDTO(savedAppointment);
    }

    private AppointmentDTO convertToDTO(Appointment appointment) {
        AppointmentDTO dto = new AppointmentDTO();
        dto.setClient(convertToDTO(appointment.getClient()));
        dto.setDate(appointment.getDate());
        dto.setTime(appointment.getTime());
        dto.setTimezone(appointment.getTimezone());
        dto.setService(appointment.getService().getId());
        dto.setNotes(appointment.getNotes());
        return dto;
    }

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