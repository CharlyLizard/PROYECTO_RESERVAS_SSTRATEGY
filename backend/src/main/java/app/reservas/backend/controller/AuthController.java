package app.reservas.backend.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.core.userdetails.UserDetails;

import app.reservas.backend.Security.JwtService;
import app.reservas.backend.dto.AdminDTO;
import app.reservas.backend.dto.LoginRequest;
import app.reservas.backend.dto.LoginResponse;
import app.reservas.backend.entity.Admin;
import app.reservas.backend.service.AdminService;

@RestController
@RequestMapping("/auth")
public class AuthController {

    private final JwtService jwtService;
    private final PasswordEncoder passwordEncoder;
    private final AdminService adminService;

    @Autowired
    public AuthController(JwtService jwtService, PasswordEncoder passwordEncoder,AdminService adminService) {
        this.jwtService = jwtService;
        this.passwordEncoder = passwordEncoder;
        this.adminService = adminService;
    }

    // ENDPOINT DE LOGUEO
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        Admin admin = adminService.getAllAdmins().stream()
                .filter(a -> a.getNombreUsuario().equals(request.getUsername()))
                .findFirst()
                .orElse(null);

        if (admin == null || !passwordEncoder.matches(request.getPassword(), admin.getPassword())) {
            return ResponseEntity.status(401).body("Credenciales incorrectas");
        }

        AdminDTO dto = adminService.convertToDTO(admin);

        // Generar tokens usando UserDetails
        UserDetails userDetails = org.springframework.security.core.userdetails.User
                .withUsername(admin.getNombreUsuario())
                .password("")
                .authorities("ROLE_ADMIN")
                .build();

        String accessToken = jwtService.generateToken(userDetails);
        String refreshToken = jwtService.generateToken(userDetails);

        // Construir respuesta
        LoginResponse response = new LoginResponse();
        response.setAdmin(dto);
        response.setAccessToken(accessToken);
        response.setRefreshToken(refreshToken);

        return ResponseEntity.ok(response);
    }

    @PutMapping("/admin")
        public ResponseEntity<?> actualizarAdmin(@RequestBody AdminDTO adminDto) {
            try {
                AdminDTO updatedAdmin = adminService.actualizarAdmin(adminDto);
                return ResponseEntity.ok(updatedAdmin);
            } catch (RuntimeException e) {
                return ResponseEntity.status(404).body(e.getMessage());
            }
        }
}