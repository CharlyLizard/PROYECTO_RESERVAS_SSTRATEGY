package app.reservas.backend.controller;

import app.reservas.backend.entity.Servicio;
import app.reservas.backend.service.ServicioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/servicios")
public class ServicioController {

    @Autowired
    private ServicioService servicioService;

    // Endpoint para obtener los servicios seleccionados
    @GetMapping("/seleccionados")
    public ResponseEntity<List<Servicio>> getServiciosSeleccionados() {
        List<Servicio> serviciosSeleccionados = servicioService.getServiciosSeleccionados();
        return ResponseEntity.ok(serviciosSeleccionados);
    }
}