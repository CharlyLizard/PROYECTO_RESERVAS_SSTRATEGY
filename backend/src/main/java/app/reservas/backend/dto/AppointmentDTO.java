package app.reservas.backend.dto;

import lombok.Data;

@Data
public class AppointmentDTO {
    private Long id; // Asumiendo que el DTO también puede tener un ID para la respuesta
    private ClientDTO client;
    private String date;
    private String time;
    private String timezone;
    private Long service; // ID del servicio
    private String notes;
    private String status; // Añadir este campo
}