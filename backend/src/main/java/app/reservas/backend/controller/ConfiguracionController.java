package app.reservas.backend.controller;

import app.reservas.backend.entity.Configuracion;
import app.reservas.backend.service.ConfiguracionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/configuracion")
public class ConfiguracionController {

    private final ConfiguracionService configuracionService;

    @Autowired
    public ConfiguracionController(ConfiguracionService configuracionService) {
        this.configuracionService = configuracionService;
    }

    @GetMapping("/general")
    public ResponseEntity<Configuracion> getConfiguracion() {
        Configuracion configuracion = configuracionService.getConfiguracion();
        return ResponseEntity.ok(configuracion);
    }

    @PostMapping("/general")
    public ResponseEntity<Configuracion> saveConfiguracion(@RequestBody Configuracion configuracion) {
        Configuracion savedConfiguracion = configuracionService.saveConfiguracion(configuracion);
        return ResponseEntity.ok(savedConfiguracion);
    }
}