package app.reservas.backend.controller;

import app.reservas.backend.entity.Secretario;
import app.reservas.backend.service.SecretarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/secretarios")
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
    
    @PutMapping("/{secretarioId}/asignar-proveedor")
    public ResponseEntity<Secretario> asignarProveedor(
            @PathVariable Long secretarioId,
            @RequestParam(required = false) Long proveedorId) { 
        return ResponseEntity.ok(secretarioService.asignarProveedorASecretario(secretarioId, proveedorId));
    }

    // Endpoint para obtener la lista de secretarios para el dropdown del modal de proveedores
    @GetMapping("/disponibles-para-dropdown")
    public ResponseEntity<List<Secretario>> getSecretariosParaDropdownProveedores(@RequestParam(required = false) Long proveedorIdActual) {
        return ResponseEntity.ok(secretarioService.getSecretariosDisponiblesParaProveedorDropdown(proveedorIdActual));
    }
}