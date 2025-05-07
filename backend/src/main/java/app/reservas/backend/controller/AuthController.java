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
import app.reservas.backend.repository.AdminRepository;

@RestController
@RequestMapping("/auth")
public class AuthController {

    private final AdminRepository adminRepository;
    private final JwtService jwtService;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public AuthController(AdminRepository adminRepository, JwtService jwtService, PasswordEncoder passwordEncoder) {
        this.adminRepository = adminRepository;
        this.jwtService = jwtService;
        this.passwordEncoder = passwordEncoder;
    }

    // ENDPOINT DE LOGUEO
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {

        Admin admin = adminRepository.findByNombreUsuario(request.getUsername());
        if (admin == null) {
            return ResponseEntity.status(401).body("Credenciales incorrectas");
        }
        boolean passwordMatch = passwordEncoder.matches(request.getPassword(), admin.getPassword());
        if (!passwordMatch) {
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
        Admin admin = adminRepository.findById(adminDto.getId()).orElse(null);
        if (admin == null) {
            return ResponseEntity.status(404).body("Administrador no encontrado");
        }

        // Actualiza los campos
        admin.setNombre(adminDto.getNombre());
        admin.setApellido(adminDto.getApellido());
        admin.setNombreUsuario(adminDto.getNombreUsuario());
        admin.setEmail(adminDto.getEmail());
        admin.setTelefono(adminDto.getTelefono());
        admin.setTelefonoMovil(adminDto.getTelefonoMovil());
        admin.setDomicilio(adminDto.getDomicilio());
        admin.setCiudad(adminDto.getCiudad());
        admin.setEstado(adminDto.getEstado());
        admin.setCodigoPostal(adminDto.getCodigoPostal());
        admin.setNotas(adminDto.getNotas());
        admin.setCalendario(adminDto.getCalendario());
        admin.setIdioma(adminDto.getIdioma());
        admin.setZonaHoraria(adminDto.getZonaHoraria());
        admin.setRecibirNotificaciones(adminDto.getRecibirNotificaciones());

        adminRepository.save(admin);
        return ResponseEntity.ok(adminDto);
    }
}