package app.reservas.backend.service;

import app.reservas.backend.dto.ServicioDTO;
import app.reservas.backend.entity.CategoriaServicio;
import app.reservas.backend.entity.Servicio;
import app.reservas.backend.repository.CategoriaServicioRepository;
import app.reservas.backend.repository.ServicioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class ServicioService {

    private final ServicioRepository servicioRepository;
    private final CategoriaServicioRepository categoriaServicioRepository;

    @Autowired
    public ServicioService(ServicioRepository servicioRepository, CategoriaServicioRepository categoriaServicioRepository) {
        this.servicioRepository = servicioRepository;
        this.categoriaServicioRepository = categoriaServicioRepository;
    }

    public List<Servicio> getServiciosSeleccionados() {
        return servicioRepository.findByIsSelectedTrue();
    }

    public List<Servicio> getAllServicios() {
        return servicioRepository.findAll();
    }

    public List<ServicioDTO> getAllServiciosDTO() {
        return getAllServicios().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public ServicioDTO convertToDTO(Servicio servicio) {
        ServicioDTO dto = new ServicioDTO();
        dto.setId(servicio.getId());
        dto.setNombre(servicio.getNombre());
        dto.setDuracionMinutos(servicio.getDuracionMinutos());
        dto.setPrecio(servicio.getPrecio());
        dto.setMoneda(servicio.getMoneda());
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
    }

    @SuppressWarnings("unchecked")
    public Map<String, Object> gestionarServicio(Map<String, Object> payload) {
        String accion = (String) payload.get("accion");
        Map<String, Object> servicioMap = (Map<String, Object>) payload.get("servicio");

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
                servicio.setId(null); 
                servicio.setFechaCreacion(java.time.LocalDateTime.now());
                servicioRepository.save(servicio);
                break;
            case "edit":
                if (servicio.getId() != null && servicioRepository.existsById(servicio.getId())) {
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
        return Map.of("servicios", servicios);
    }

    public List<ServicioDTO> seleccionarServicioPrincipal(Long servicioId) {
        List<Servicio> serviciosActualizados = seleccionarServicioPrincipalEntity(servicioId);
        return serviciosActualizados.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @Transactional
    public List<Servicio> seleccionarServicioPrincipalEntity(Long servicioId) {
        Servicio servicioASeleccionar = servicioRepository.findById(servicioId)
                .orElseThrow(() -> new RuntimeException("Servicio no encontrado con ID: " + servicioId));

        if (Boolean.TRUE.equals(servicioASeleccionar.getIsSelected())) {
            return servicioRepository.findAll();
        }

        List<Servicio> todosLosServicios = servicioRepository.findAll();
        for (Servicio s : todosLosServicios) {
            s.setIsSelected(false);
        }

        for (Servicio s : todosLosServicios) {
            if (s.getId().equals(servicioId)) {
                s.setIsSelected(true);
                break;
            }
        }

        return servicioRepository.saveAll(todosLosServicios);
    }
}