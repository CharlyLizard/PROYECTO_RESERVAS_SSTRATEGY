package app.reservas.backend.dto;

import lombok.Data;

@Data
public class LoginResponse {
    private AdminDTO admin;
    private String accessToken;
    private String refreshToken;
}