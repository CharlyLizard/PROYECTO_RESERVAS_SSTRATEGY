package app.reservas.backend.dto;

import lombok.Data;

import java.math.BigDecimal;

@Data
public class ServicioDTO {
    private Long id;
    private String nombre;
    private Integer duracionMinutos;
    private BigDecimal precio;
    private String moneda;
    private Integer categoriaId;
    private String categoriaNombre;
    private String tiposDisponibles;
    private Integer numeroAsistentes;
    private String ubicacion;
    private String color;
    private Boolean ocultarPublico;
    private String descripcion;
    private Boolean isSelected;
}