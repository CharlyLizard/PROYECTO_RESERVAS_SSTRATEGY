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
        Map<String, Object> categoriaMap = (Map<String, Object>) payload.get("categoria");

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
                categoria.setFechaCreacion(java.time.LocalDateTime.now()); // <-- Añade la fecha de creación
                categoriaServicioRepository.save(categoria);
                break;
            case "edit":
                if (categoria.getId() != null && categoriaServicioRepository.existsById(categoria.getId())) {
                    // Opcional: puedes mantener la fecha de creación original si lo deseas
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
        return ResponseEntity.ok(Map.of("categorias", categorias));
    }
}