package app.reservas.backend.controller;

import app.reservas.backend.entity.CategoriaServicio;
import app.reservas.backend.repository.CategoriaServicioRepository;
import lombok.RequiredArgsConstructor;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/categorias")
@RequiredArgsConstructor
public class CategoriaServicioController {

    private final CategoriaServicioRepository categoriaServicioRepository;

    @GetMapping
    public List<CategoriaServicio> getAllCategorias() {
        return categoriaServicioRepository.findAll();
    }

    @PostMapping("/gestionar")
    public ResponseEntity<?> gestionarCategoria(@RequestBody Map<String, Object> payload) {
    String accion = (String) payload.get("accion");
    Object categoriaObj = payload.get("categoria");
    Map<String, Object> categoriaMap = null;
    if (categoriaObj instanceof Map) {
        if (categoriaObj instanceof Map<?, ?>) {
            @SuppressWarnings("unchecked")
            Map<String, Object> safeMap = (Map<String, Object>) categoriaObj;
            categoriaMap = safeMap;
        }
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
            categoria.setId(null); // Asegura que es nuevo
            categoriaServicioRepository.save(categoria);
            break;
        case "edit":
            if (categoria.getId() != null && categoriaServicioRepository.existsById(categoria.getId())) {
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
    return ResponseEntity.ok(Map.of("categorias", categorias));
}
}