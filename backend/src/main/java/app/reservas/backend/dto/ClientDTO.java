package app.reservas.backend.dto;

import lombok.Data;

@Data
public class ClientDTO {
    private Long id;
    private String name;
    private String email;
    private String phone;
    private String address;
    private String city;
    private String postalCode;
}