package app.reservas.backend.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

@Entity
@Table(name = "secretario")
@Data
public class Secretario {
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

    private String idioma ;

    @Column(name = "zona_horaria")
    private String zonaHoraria;

    @Column(name = "recibir_notificaciones")
    private Boolean recibirNotificaciones ;

    @ManyToOne
    @JoinColumn(name = "proveedor_id")
    private Proveedor proveedor;

    @Column(name = "fecha_creacion")
    private LocalDateTime fechaCreacion = LocalDateTime.now();

}