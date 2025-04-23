package app.reservas.backend.dto;

import lombok.Data;

@Data
public class AppointmentDTO {

    private ClientDTO client;
    private String date;
    private String time;
    private String timezone;
    private String service;
    private String notes;

    
}