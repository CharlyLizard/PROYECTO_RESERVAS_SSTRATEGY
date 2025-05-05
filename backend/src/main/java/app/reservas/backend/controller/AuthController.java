package app.reservas.backend.controller;

import lombok.RequiredArgsConstructor;
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
@RequiredArgsConstructor
public class AuthController {

    private final AdminRepository adminRepository;
    private final JwtService jwtService;
    private final PasswordEncoder passwordEncoder;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        System.out.println("---- LOGIN ADMIN ----");
        System.out.println("Usuario recibido: " + request.getUsername());
        System.out.println("Contraseña recibida: " + request.getPassword());

        Admin admin = adminRepository.findByNombreUsuario(request.getUsername());
        if (admin == null) {
            System.out.println("No existe el usuario: " + request.getUsername());
            return ResponseEntity.status(401).body("Credenciales incorrectas");
        }

        System.out.println("Hash en BD: " + admin.getPassword());
        //System.out.println(new org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder().encode("admin123"));
        boolean passwordMatch = passwordEncoder.matches(request.getPassword(), admin.getPassword());
        System.out.println("¿Contraseña coincide?: " + passwordMatch);

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
            .password("") // No es necesario para el token
            .authorities("ROLE_ADMIN")
            .build();

        String accessToken = jwtService.generateToken(userDetails);
        String refreshToken = jwtService.generateToken(userDetails); // O usa generateRefreshToken si lo tienes

        // Construir respuesta
        LoginResponse response = new LoginResponse();
        response.setAdmin(dto);
        response.setAccessToken(accessToken);
        response.setRefreshToken(refreshToken);

        System.out.println("Login correcto. Enviando datos y tokens.");
        return ResponseEntity.ok(response);
    }

    @PutMapping("/admin")
    public ResponseEntity<?> actualizarAdmin(@RequestBody AdminDTO adminDto) {
        System.out.println("Petición de actualización de admin: " + adminDto);

        Admin admin = adminRepository.findById(adminDto.getId()).orElse(null);
        if (admin == null) {
            return ResponseEntity.status(404).body("Administrador no encontrado");
        }

        // Actualiza los campos (excepto la contraseña, a menos que la quieras actualizar aquí)
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

        // Si quieres permitir actualizar la contraseña, añade lógica aquí

        adminRepository.save(admin);

        // Devuelve el admin actualizado (puedes mapearlo a AdminDTO si quieres)
        return ResponseEntity.ok(adminDto);
    }
}