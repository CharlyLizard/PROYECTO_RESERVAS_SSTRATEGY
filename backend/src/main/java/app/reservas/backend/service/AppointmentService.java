package app.reservas.backend.service;

import app.reservas.backend.dto.AppointmentDTO;
import app.reservas.backend.dto.ClientDTO;
import app.reservas.backend.entity.Appointment;
import app.reservas.backend.entity.CategoriaServicio;
import app.reservas.backend.entity.Client;
import app.reservas.backend.entity.Proveedor;
import app.reservas.backend.entity.Secretario;
import app.reservas.backend.entity.Servicio;
import app.reservas.backend.repository.AppointmentRepository;
import app.reservas.backend.repository.ClientRepository;
import app.reservas.backend.repository.ProveedorRepository;
import app.reservas.backend.repository.SecretarioRepository;
import app.reservas.backend.repository.ServicioRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class AppointmentService {

    private final AppointmentRepository appointmentRepository;
    private final ClientRepository clientRepository;
    private final ServicioRepository servicioRepository;
    private final ProveedorRepository proveedorRepository; 
    private final SecretarioRepository secretarioRepository; 

    @Autowired
    public AppointmentService(AppointmentRepository appointmentRepository,
                              ClientRepository clientRepository,
                              ServicioRepository servicioRepository,
                              ProveedorRepository proveedorRepository, 
                              SecretarioRepository secretarioRepository) { 
        this.appointmentRepository = appointmentRepository;
        this.clientRepository = clientRepository;
        this.servicioRepository = servicioRepository;
        this.proveedorRepository = proveedorRepository; 
        this.secretarioRepository = secretarioRepository; 
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
        appointment.setStatus(appointmentDTO.getStatus()); // Añadir esto

        Appointment savedAppointment = appointmentRepository.save(appointment);

        return convertToDTO(savedAppointment);
    }

    private AppointmentDTO convertToDTO(Appointment appointment) {
        AppointmentDTO dto = new AppointmentDTO();
        dto.setClient(convertToDTO(appointment.getClient()));
        dto.setDate(appointment.getDate());
        dto.setTime(appointment.getTime());
        dto.setTimezone(appointment.getTimezone());

        // Verificar si el servicio es null antes de acceder a sus propiedades
        if (appointment.getService() != null) {
            dto.setService(appointment.getService().getId());
        } else {
            dto.setService(null); // O manejarlo de otra manera, como asignar un valor predeterminado
        }

        dto.setNotes(appointment.getNotes());
        dto.setStatus(appointment.getStatus()); // Añadir esto
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

    // Método para eliminar citas pasadas
    public void eliminarCitasPasadas() {
        LocalDate hoy = LocalDate.now();
        List<Appointment> citasPasadas = appointmentRepository.findAll()
            .stream()
            .filter(cita -> LocalDate.parse(cita.getDate()).isBefore(hoy))
            .collect(Collectors.toList());

        appointmentRepository.deleteAll(citasPasadas);
    }

        // Ejecutar todos los días a la medianoche
        @Scheduled(cron = "0 */2 * * * ?")
        public void eliminarCitasPasadasProgramadas() {
            eliminarCitasPasadas();
        }


    //CALENDARIO
    public List<Map<String, Object>> getAllAppointmentsWithDetails() {
    return appointmentRepository.findAll().stream().map(appointment -> {
        Map<String, Object> details = new HashMap<>();
        details.put("appointmentId", appointment.getId());
        details.put("date", appointment.getDate());
        details.put("time", appointment.getTime());
        details.put("timezone", appointment.getTimezone());
        details.put("notes", appointment.getNotes());
        details.put("status", appointment.getStatus()); // Añadir esto

        // Cliente
        Client client = appointment.getClient();
        if (client != null) {
            Map<String, Object> clientDetails = new HashMap<>();
            clientDetails.put("id", client.getId());
            clientDetails.put("name", client.getName());
            // Consider adding client.getLastName() if it exists and is needed for "nombre y apellidos"
            clientDetails.put("email", client.getEmail());
            clientDetails.put("phone", client.getPhone());
            details.put("client", clientDetails);
        }

        // Servicio
        Servicio servicio = appointment.getService();
        if (servicio != null) {
            Map<String, Object> serviceDetails = new HashMap<>();
            serviceDetails.put("id", servicio.getId());
            serviceDetails.put("name", servicio.getNombre());
            serviceDetails.put("color", servicio.getColor());
            serviceDetails.put("description", servicio.getDescripcion());

            // Categoría
            CategoriaServicio categoria = servicio.getCategoria();
            if (categoria != null) {
                Map<String, Object> categoryDetails = new HashMap<>();
                categoryDetails.put("id", categoria.getId());
                categoryDetails.put("name", categoria.getNombre());
                serviceDetails.put("category", categoryDetails);
            }

            details.put("service", serviceDetails);

            // Proveedores relacionados con el servicio
            List<Map<String, Object>> providersDetailsList = new ArrayList<>();
            // Fetch proveedores using ProveedorRepository
            List<Proveedor> proveedoresDelServicio = proveedorRepository.findByServicio(servicio);

            for (Proveedor proveedor : proveedoresDelServicio) {
                Map<String, Object> providerDetailsMap = new HashMap<>();
                providerDetailsMap.put("id", proveedor.getId());
                providerDetailsMap.put("name", proveedor.getNombre());
                providerDetailsMap.put("apellido", proveedor.getApellido()); // Assuming you want apellido
                providerDetailsMap.put("email", proveedor.getEmail());
                // Add other relevant proveedor fields as needed

                // Secretario asignado al proveedor
                // Fetch secretario using SecretarioRepository
                Optional<Secretario> optSecretario = secretarioRepository.findByProveedor_Id(proveedor.getId());
                if (optSecretario.isPresent()) {
                    Secretario secretario = optSecretario.get();
                    Map<String, Object> secretaryDetailsMap = new HashMap<>();
                    secretaryDetailsMap.put("id", secretario.getId());
                    secretaryDetailsMap.put("name", secretario.getNombre());
                    secretaryDetailsMap.put("apellido", secretario.getApellido()); // Assuming you want apellido
                    secretaryDetailsMap.put("email", secretario.getEmail());
                    // Add other relevant secretario fields as needed
                    providerDetailsMap.put("secretary", secretaryDetailsMap);
                }
                providersDetailsList.add(providerDetailsMap);
            }
            details.put("providers", providersDetailsList); // Changed key for clarity
        }

        return details;
    }).collect(Collectors.toList());
}

    @SuppressWarnings("unchecked")
    public Map<String, Object> gestionarAppointment(Map<String, Object> payload) {
        String accion = (String) payload.get("accion");
        Map<String, Object> appointmentMap = null;
        Object appointmentObj = payload.get("appointment");
        if (appointmentObj instanceof Map) {
            appointmentMap = (Map<String, Object>) appointmentObj;
        }

        Appointment appointment = new Appointment();
        if (appointmentMap != null) {
            if (appointmentMap.get("id") != null) {
                appointment.setId(Long.valueOf(appointmentMap.get("id").toString()));
            }
            appointment.setDate((String) appointmentMap.get("date"));
            appointment.setTime((String) appointmentMap.get("time"));
            appointment.setTimezone((String) appointmentMap.get("timezone"));
            appointment.setNotes((String) appointmentMap.get("notes"));
            appointment.setStatus((String) appointmentMap.get("status")); // Añadir esto

            // Relacionar cliente y servicio (ajusta según tus entidades)
            if (appointmentMap.get("clientId") != null) {
                Long clientId = Long.valueOf(appointmentMap.get("clientId").toString());
                appointment.setClient(clientRepository.findById(clientId).orElse(null));
            }
            if (appointmentMap.get("serviceId") != null) {
                Long serviceId = Long.valueOf(appointmentMap.get("serviceId").toString());
                appointment.setService(servicioRepository.findById(serviceId).orElse(null));
            }
        }

        switch (accion) {
            case "add":
                appointment.setId(null);
                appointmentRepository.save(appointment);
                break;
            case "edit":
                if (appointment.getId() != null && appointmentRepository.existsById(appointment.getId())) {
                    appointmentRepository.save(appointment);
                }
                break;
            case "delete":
                if (appointment.getId() != null && appointmentRepository.existsById(appointment.getId())) {
                    appointmentRepository.deleteById(appointment.getId());
                }
                break;
        }

        List<Appointment> appointments = appointmentRepository.findAll();
        return Map.of("appointments", appointments);
    }
    
}