package app.reservas.backend.service;

import app.reservas.backend.entity.CategoriaServicio;
import app.reservas.backend.repository.CategoriaServicioRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class CategoriaService {

    private final CategoriaServicioRepository categoriaServicioRepository;

    @Autowired
    public CategoriaService(CategoriaServicioRepository categoriaServicioRepository) {
        this.categoriaServicioRepository = categoriaServicioRepository;
    }

    public List<CategoriaServicio> getAllCategorias() {
        return categoriaServicioRepository.findAll();
    }

    public Map<String, Object> gestionarCategoria(Map<String, Object> payload) {
        String accion = (String) payload.get("accion");
        Map<String, Object> categoriaMap = null;
        Object categoriaObj = payload.get("categoria");
        if (categoriaObj instanceof Map<?, ?>) {
            @SuppressWarnings("unchecked")
            Map<String, Object> tempMap = (Map<String, Object>) categoriaObj;
            categoriaMap = tempMap;
        }

        CategoriaServicio categoria = new CategoriaServicio();
        if (categoriaMap != null) {
            if (categoriaMap.get("id") != null) {
                categoria.setId((Integer) categoriaMap.get("id"));
            }
            categoria.setNombre((String) categoriaMap.get("nombre"));
            categoria.setDescripcion((String) categoriaMap.get("descripcion"));
        }

        switch (accion) {
            case "add":
                categoria.setId(null); 
                categoria.setFechaCreacion(java.time.LocalDateTime.now());
                categoriaServicioRepository.save(categoria);
                break;
            case "edit":
                if (categoria.getId() != null && categoriaServicioRepository.existsById(categoria.getId())) {
                    CategoriaServicio existente = categoriaServicioRepository.findById(categoria.getId()).orElse(null);
                    if (existente != null && existente.getFechaCreacion() != null) {
                        categoria.setFechaCreacion(existente.getFechaCreacion());
                    }
                    categoriaServicioRepository.save(categoria);
                }
                break;
            case "delete":
                if (categoria.getId() != null && categoriaServicioRepository.existsById(categoria.getId())) {
                    categoriaServicioRepository.deleteById(categoria.getId());
                }
                break;
        }

        List<CategoriaServicio> categorias = categoriaServicioRepository.findAll();
        return Map.of("categorias", categorias);
    }
}