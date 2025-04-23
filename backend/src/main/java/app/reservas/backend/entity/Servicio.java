package app.reservas.backend.entity;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "servicio")
public class Servicio {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 100)
    private String nombre;

    @Column(name = "duracion_minutos", nullable = false)
    private Integer duracionMinutos;

    @Column(precision = 10, scale = 2)
    private BigDecimal precio = BigDecimal.ZERO;

    @Column(length = 10, nullable = false)
    private String moneda = "USD";

    @Column(length = 100)
    private String categoria;

    @Column(name = "tipos_disponibles", length = 50, nullable = false)
    private String tiposDisponibles = "Flexible";

    @Column(name = "numero_asistentes", nullable = false)
    private Integer numeroAsistentes = 1;

    @Column(length = 255)
    private String ubicacion;

    @Column(length = 20, nullable = false)
    private String color = "#FFFFFF";

    @Column(name = "ocultar_publico", nullable = false)
    private Boolean ocultarPublico = false;

    @Column(columnDefinition = "TEXT")
    private String descripcion;

    @Column(name = "fecha_creacion", nullable = false)
    private LocalDateTime fechaCreacion = LocalDateTime.now();

}