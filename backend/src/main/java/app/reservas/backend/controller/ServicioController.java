package app.reservas.backend.controller;

import app.reservas.backend.dto.ServicioDTO;
import app.reservas.backend.entity.Servicio;
import app.reservas.backend.service.ServicioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/servicios")
public class ServicioController {

    @Autowired
    private ServicioService servicioService;

    @GetMapping
    public ResponseEntity<List<ServicioDTO>> getAllServicios() {
        List<Servicio> servicios = servicioService.getAllServicios();
        List<ServicioDTO> serviciosDTO = servicios.stream()
            .map(servicio -> {
                ServicioDTO dto = new ServicioDTO();
                // Mapear propiedades básicas
                dto.setId(servicio.getId());
                dto.setNombre(servicio.getNombre());
                // ... otros campos ...
                
                // Incluir información de la categoría
                if (servicio.getCategoria() != null) {
                    dto.setCategoriaId(servicio.getCategoria().getId());
                    dto.setCategoriaNombre(servicio.getCategoria().getNombre());
                }
                
                return dto;
            })
            .collect(Collectors.toList());
            
        return ResponseEntity.ok(serviciosDTO);
    }
    
    // Endpoint para obtener los servicios seleccionados
    @GetMapping("/seleccionados")
    public ResponseEntity<List<Servicio>> getServiciosSeleccionados() {
        List<Servicio> serviciosSeleccionados = servicioService.getServiciosSeleccionados();
        return ResponseEntity.ok(serviciosSeleccionados);
    }
}