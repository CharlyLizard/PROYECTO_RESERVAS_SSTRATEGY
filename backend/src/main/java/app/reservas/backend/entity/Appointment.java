package app.reservas.backend.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "appointments")
@Data
public class Appointment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "client_id")
    private Client client;

    private String date;
    private String time;
    private String timezone;

    @ManyToOne
    @JoinColumn(name = "service")
    private Servicio service;

    private String notes;
}