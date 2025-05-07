package app.reservas.backend.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

@Entity
@Table(name = "proveedor")
@Data
public class Proveedor {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nombre;

    private String apellido;

    @Column(name = "nombre_usuario")
    private String nombreUsuario;

    private byte[] password;

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

    private String calendario;

    private String idioma;

    @Column(name = "zona_horaria")
    private String zonaHoraria ;

    @Column(name = "recibir_notificaciones")
    private Boolean recibirNotificaciones;

    @Column(name = "ocultar_publico")
    private Boolean ocultarPublico;

    @ManyToOne
    @JoinColumn(name = "servicio_id")
    private Servicio servicio;

    @Column(name = "fecha_creacion")
    private LocalDateTime fechaCreacion = LocalDateTime.now();

}