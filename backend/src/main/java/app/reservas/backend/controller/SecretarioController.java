package app.reservas.backend.controller;

import app.reservas.backend.entity.Secretario;
import app.reservas.backend.service.SecretarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/secretario")
public class SecretarioController {

    private final SecretarioService secretarioService;

    @Autowired
    public SecretarioController(SecretarioService secretarioService) {
        this.secretarioService = secretarioService;
    }

    @GetMapping("/all")
    public List<Secretario> getAllSecretarios() {
        return secretarioService.getAllSecretarios();
    }

    @PostMapping("/gestionar")
    public ResponseEntity<?> gestionarSecretario(@RequestBody Map<String, Object> payload) {
        return ResponseEntity.ok(secretarioService.gestionarSecretario(payload));
    }
}