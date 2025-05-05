package app.reservas.backend.dto;

import lombok.Data;

@Data
public class AdminDTO {
    private Long id;
    private String nombre;
    private String apellido;
    private String nombreUsuario;
    private String email;
    private String telefono;
    private String telefonoMovil;
    private String domicilio;
    private String ciudad;
    private String estado;
    private String codigoPostal;
    private String notas;
    private String calendario;
    private String idioma;
    private String zonaHoraria;
    private Boolean recibirNotificaciones;
}