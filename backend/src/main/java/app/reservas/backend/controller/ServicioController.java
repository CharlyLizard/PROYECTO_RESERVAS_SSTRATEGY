package app.reservas.backend.controller;

import app.reservas.backend.dto.ServicioDTO;
import app.reservas.backend.entity.Servicio;
import app.reservas.backend.service.ServicioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/servicios")
public class ServicioController {

    private final ServicioService servicioService;

    @Autowired
    public ServicioController(ServicioService servicioService) {
        this.servicioService = servicioService;
    }

    // ENDPOINT PARA OBTENER TODOS LOS SERVICIOS
    @GetMapping
    public ResponseEntity<List<ServicioDTO>> getAllServicios() {
        return ResponseEntity.ok(servicioService.getAllServiciosDTO());
    }

    // Endpoint para obtener los servicios seleccionados
    @GetMapping("/seleccionados")
    public ResponseEntity<List<Servicio>> getServiciosSeleccionados() {
        return ResponseEntity.ok(servicioService.getServiciosSeleccionados());
    }

    // EDNPOINT GESTIONAR SERVICIOS
    @PostMapping("/gestionar")
    public ResponseEntity<?> gestionarServicio(@RequestBody Map<String, Object> payload) {
        return ResponseEntity.ok(servicioService.gestionarServicio(payload));
    }


    // ENDPOINT PARA SELECCIONAR UN SERVICIO COMO PRINCIPAL
    @PutMapping("/seleccionar-principal/{id}")
    public ResponseEntity<List<ServicioDTO>> seleccionarServicioPrincipal(@PathVariable Long id) {
        return ResponseEntity.ok(servicioService.seleccionarServicioPrincipal(id));
    }
}