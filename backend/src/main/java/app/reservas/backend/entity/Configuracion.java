package app.reservas.backend.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "configuracion")
@Data
public class Configuracion {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "nombre_empresa")
    private String nombreEmpresa;

    @Column(name = "email_empresa")
    private String emailEmpresa;

    @Column(name = "enlace_empresa")
    private String enlaceEmpresa;

    @Column(name = "logotipo_url")
    private String logotipoUrl;

    @Column(name = "color_corporativo")
    private String colorCorporativo;

    private String tema;

    @Column(name = "formato_fecha")
    private String formatoFecha;

    @Column(name = "primer_dia_semana")
    private String primerDiaSemana;

    @Column(name = "idioma_predeterminado")
    private String idiomaPredeterminado;

    @Column(name = "zona_horaria_predeterminada")
    private String zonaHorariaPredeterminada;

    @Version
    private Integer version;
}