package app.reservas.backend.controller;

import app.reservas.backend.dto.ServicioDTO;
import app.reservas.backend.entity.CategoriaServicio;
import app.reservas.backend.entity.Servicio;
import app.reservas.backend.repository.ServicioRepository;
import app.reservas.backend.repository.CategoriaServicioRepository;
import app.reservas.backend.service.ServicioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/servicios")
public class ServicioController {

    @Autowired
    private ServicioService servicioService;

    @Autowired
    private ServicioRepository servicioRepository;

    @Autowired
    private CategoriaServicioRepository categoriaServicioRepository;

    @GetMapping
    public ResponseEntity<List<ServicioDTO>> getAllServicios() {
        List<Servicio> servicios = servicioService.getAllServicios();
        List<ServicioDTO> serviciosDTO = servicios.stream()
            .map(servicio -> {
                ServicioDTO dto = new ServicioDTO();
                // Mapear propiedades básicas
                dto.setId(servicio.getId());
                dto.setNombre(servicio.getNombre());
                dto.setId(servicio.getId());
                dto.setNombre(servicio.getNombre());
                dto.setDuracionMinutos(servicio.getDuracionMinutos());
                dto.setPrecio(servicio.getPrecio());
                dto.setMoneda(servicio.getMoneda());
                // ... otros campos ...
                
                // Incluir información de la categoría
                if (servicio.getCategoria() != null) {
                    dto.setCategoriaId(servicio.getCategoria().getId());
                    dto.setCategoriaNombre(servicio.getCategoria().getNombre());
                }

                dto.setTiposDisponibles(servicio.getTiposDisponibles());
                dto.setNumeroAsistentes(servicio.getNumeroAsistentes());
                dto.setUbicacion(servicio.getUbicacion());
                dto.setColor(servicio.getColor());
                dto.setOcultarPublico(servicio.getOcultarPublico());
                dto.setDescripcion(servicio.getDescripcion());
                dto.setFechaCreacion(servicio.getFechaCreacion() != null ? servicio.getFechaCreacion().toString() : null);
                dto.setIsSelected(servicio.getIsSelected());
                
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

    @PostMapping("/gestionar")
    public ResponseEntity<?> gestionarServicio(@RequestBody Map<String, Object> payload) {
    String accion = (String) payload.get("accion");
    Map<String, Object> servicioMap = (Map<String, Object>) payload.get("servicio");

    // Crear o actualizar la entidad Servicio
    Servicio servicio = new Servicio();
    if (servicioMap != null) {
        if (servicioMap.get("id") != null) {
            servicio.setId(Long.valueOf(servicioMap.get("id").toString()));
        }
        servicio.setNombre((String) servicioMap.get("nombre"));
        servicio.setDuracionMinutos(servicioMap.get("duracionMinutos") != null ? Integer.valueOf(servicioMap.get("duracionMinutos").toString()) : null);
        servicio.setPrecio(servicioMap.get("precio") != null ? new java.math.BigDecimal(servicioMap.get("precio").toString()) : java.math.BigDecimal.ZERO);
        servicio.setMoneda((String) servicioMap.get("moneda"));
        servicio.setTiposDisponibles((String) servicioMap.get("tiposDisponibles"));
        servicio.setNumeroAsistentes(servicioMap.get("numeroAsistentes") != null ? Integer.valueOf(servicioMap.get("numeroAsistentes").toString()) : null);
        servicio.setUbicacion((String) servicioMap.get("ubicacion"));
        servicio.setColor((String) servicioMap.get("color"));
        servicio.setOcultarPublico(servicioMap.get("ocultarPublico") != null ? Boolean.valueOf(servicioMap.get("ocultarPublico").toString()) : false);
        servicio.setDescripcion((String) servicioMap.get("descripcion"));
        servicio.setIsSelected(servicioMap.get("isSelected") != null ? Boolean.valueOf(servicioMap.get("isSelected").toString()) : false);

        // Manejar la categoría (opcional)
        if (servicioMap.get("categoriaId") != null) {
            Integer categoriaId = Integer.valueOf(servicioMap.get("categoriaId").toString());
            if (categoriaId != null) {
                CategoriaServicio categoria = categoriaServicioRepository.findById(categoriaId).orElse(null);
                servicio.setCategoria(categoria);
            }
        } else {
            servicio.setCategoria(null);
        }
    }

    switch (accion) {
        case "add":
            servicio.setId(null); // Asegura que es nuevo
            servicio.setFechaCreacion(java.time.LocalDateTime.now());
            servicioRepository.save(servicio);
            break;
        case "edit":
            if (servicio.getId() != null && servicioRepository.existsById(servicio.getId())) {
                // Mantener la fecha de creación original
                Servicio existente = servicioRepository.findById(servicio.getId()).orElse(null);
                if (existente != null && existente.getFechaCreacion() != null) {
                    servicio.setFechaCreacion(existente.getFechaCreacion());
                }
                servicioRepository.save(servicio);
            }
            break;
        case "delete":
            if (servicio.getId() != null && servicioRepository.existsById(servicio.getId())) {
                servicioRepository.deleteById(servicio.getId());
            }
            break;
    }

    // Devuelve la lista actualizada de servicios (puedes mapear a DTO si lo prefieres)
    List<Servicio> servicios = servicioRepository.findAll();
    return ResponseEntity.ok(Map.of("servicios", servicios));
}
}