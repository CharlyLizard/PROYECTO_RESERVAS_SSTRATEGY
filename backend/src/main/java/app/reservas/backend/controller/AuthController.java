package app.reservas.backend.controller;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import app.reservas.backend.dto.AdminDTO;
import app.reservas.backend.dto.LoginRequest;
import app.reservas.backend.entity.Admin;
import app.reservas.backend.repository.AdminRepository;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;
    private AdminRepository adminRepository;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        Admin admin = adminRepository.findByNombreUsuario(loginRequest.getUsername());
        if (admin != null && passwordEncoder.matches(loginRequest.getPassword(), new String(admin.getPassword()))) {
            AdminDTO dto = new AdminDTO();
            // Copia los campos necesarios
            dto.setId(admin.getId());
            dto.setNombre(admin.getNombre());
            // ...el resto de campos...
            return ResponseEntity.ok(dto);
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Credenciales incorrectas");
    }
}
