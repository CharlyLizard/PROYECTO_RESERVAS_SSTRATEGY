package app.reservas.backend.controller;

import app.reservas.backend.entity.Proveedor;
import app.reservas.backend.service.ProveedorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/proveedores")
public class ProveedorController {

    private final ProveedorService proveedorService;

    @Autowired
    public ProveedorController(ProveedorService proveedorService) {
        this.proveedorService = proveedorService;
    }

    @GetMapping("/all")
    public List<Proveedor> getAllProveedores() {
        return proveedorService.getAllProveedores();
    }

    @PostMapping("/gestionar")
    public ResponseEntity<?> gestionarProveedor(@RequestBody Map<String, Object> payload) {
        return ResponseEntity.ok(proveedorService.gestionarProveedor(payload));
    }
}