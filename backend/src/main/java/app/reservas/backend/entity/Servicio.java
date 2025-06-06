package app.reservas.backend.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "servicio")
@Data
public class Servicio {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nombre;

    @Column(name = "duracion_minutos")
    private Integer duracionMinutos;

    private BigDecimal precio = BigDecimal.ZERO;

    private String moneda ;

    @ManyToOne
    @JoinColumn(name = "categoria_id")
    private CategoriaServicio categoria;
    
    @Column(name = "tipos_disponibles")
    private String tiposDisponibles;

    @Column(name = "numero_asistentes")
    private Integer numeroAsistentes;

    private String ubicacion;

    private String color;

    @Column(name = "ocultar_publico")
    private Boolean ocultarPublico;

    private String descripcion;

    @Column(name = "fecha_creacion")
    private LocalDateTime fechaCreacion = LocalDateTime.now();

    @Column(name = "is_selected")
    private Boolean isSelected;
}