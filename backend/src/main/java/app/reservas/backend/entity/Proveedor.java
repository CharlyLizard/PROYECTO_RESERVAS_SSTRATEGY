package app.reservas.backend.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "proveedor")
public class Proveedor {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 50)
    private String nombre;

    @Column(nullable = false, length = 50)
    private String apellido;

    @Column(name = "nombre_usuario", nullable = false, length = 50, unique = true)
    private String nombreUsuario;

    @Column(nullable = false)
    private byte[] password;

    @Column(nullable = false, length = 100, unique = true)
    private String email;

    @Column(length = 20)
    private String telefono;

    @Column(name = "telefono_movil", length = 20)
    private String telefonoMovil;

    @Column(length = 255)
    private String domicilio;

    @Column(length = 100)
    private String ciudad;

    @Column(length = 100)
    private String estado;

    @Column(name = "codigo_postal", length = 20)
    private String codigoPostal;

    @Column(columnDefinition = "TEXT")
    private String notas;

    @Column(length = 50, nullable = false)
    private String calendario = "Predeterminado";

    @Column(length = 50, nullable = false)
    private String idioma = "Spanish";

    @Column(name = "zona_horaria", length = 50, nullable = false)
    private String zonaHoraria = "UTC";

    @Column(name = "recibir_notificaciones", nullable = false)
    private Boolean recibirNotificaciones = true;

    @Column(name = "ocultar_publico", nullable = false)
    private Boolean ocultarPublico = false;

    @ManyToOne
    @JoinColumn(name = "servicio_id", nullable = false)
    private Servicio servicio;

    @Column(name = "fecha_creacion", nullable = false)
    private LocalDateTime fechaCreacion = LocalDateTime.now();

    // Getters and Setters
}