package app.reservas.backend.entity;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

@Entity
@Table(name = "categoria_servicio")
@Data
public class CategoriaServicio {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String nombre;

    private String descripcion;

    @Column(name = "fecha_creacion")
    private LocalDateTime fechaCreacion;
}
