package app.reservas.backend.controller;


import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;

import app.reservas.backend.Security.JwtService;
import app.reservas.backend.dto.AdminDTO;
import app.reservas.backend.dto.LoginRequest;
import app.reservas.backend.dto.LoginResponse;
import app.reservas.backend.entity.Admin;
import app.reservas.backend.repository.AdminRepository;


@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AdminRepository adminRepository;
    private final JwtService jwtService;
    private final PasswordEncoder passwordEncoder;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        Admin admin = adminRepository.findByNombreUsuario(request.getUsername());
        if (admin == null || !passwordEncoder.matches(request.getPassword(), new String(admin.getPassword()))) {
            return ResponseEntity.status(401).body("Credenciales incorrectas");
        }

        // Mapear Admin a AdminDTO
        AdminDTO dto = new AdminDTO();
        dto.setId(admin.getId());
        dto.setNombre(admin.getNombre());
        dto.setApellido(admin.getApellido());
        dto.setNombreUsuario(admin.getNombreUsuario());
        dto.setEmail(admin.getEmail());
        dto.setTelefono(admin.getTelefono());
        dto.setTelefonoMovil(admin.getTelefonoMovil());
        dto.setDomicilio(admin.getDomicilio());
        dto.setCiudad(admin.getCiudad());
        dto.setEstado(admin.getEstado());
        dto.setCodigoPostal(admin.getCodigoPostal());
        dto.setNotas(admin.getNotas());
        dto.setCalendario(admin.getCalendario());
        dto.setIdioma(admin.getIdioma());
        dto.setZonaHoraria(admin.getZonaHoraria());
        dto.setRecibirNotificaciones(admin.getRecibirNotificaciones());

        // Generar tokens usando UserDetails
        UserDetails userDetails = User.withUsername(admin.getNombreUsuario())
            .password("") // No es necesario para el token
            .authorities("ROLE_ADMIN") // Puedes ajustar el rol si lo necesitas
            .build();

        String accessToken = jwtService.generateToken(userDetails);
        String refreshToken = jwtService.generateToken(userDetails); // O crea un método específico si quieres expiración distinta

        // Construir respuesta
        LoginResponse response = new LoginResponse();
        response.setAdmin(dto);
        response.setAccessToken(accessToken);
        response.setRefreshToken(refreshToken);

        return ResponseEntity.ok(response);
    }

}

