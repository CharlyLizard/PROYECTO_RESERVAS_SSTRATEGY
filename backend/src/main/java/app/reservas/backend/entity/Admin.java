package app.reservas.backend.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

@Entity
@Table(name = "admin")
@Data
public class Admin {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nombre;

    private String apellido;

    @Column(name = "nombre_usuario")
    private String nombreUsuario;

    @Column(name = "password")
    private String password;

    private String email;

    private String telefono;

    @Column(name = "telefono_movil")
    private String telefonoMovil;

    private String domicilio;

    private String ciudad;

    private String estado;

    @Column(name = "codigo_postal")
    private String codigoPostal;

    private String notas;

    private String calendario = "Predeterminado";

    private String idioma = "Spanish";

    @Column(name = "zona_horaria")
    private String zonaHoraria = "UTC";

    @Column(name = "recibir_notificaciones")
    private Boolean recibirNotificaciones = true;

    @Column(name = "fecha_creacion")
    private LocalDateTime fechaCreacion = LocalDateTime.now();

}