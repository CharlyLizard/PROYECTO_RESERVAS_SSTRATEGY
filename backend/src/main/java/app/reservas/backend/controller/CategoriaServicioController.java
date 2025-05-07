package app.reservas.backend.controller;

import app.reservas.backend.entity.CategoriaServicio;
import app.reservas.backend.service.CategoriaService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/categorias")
public class CategoriaServicioController {

    private final CategoriaService categoriaService;

    @Autowired
    public CategoriaServicioController(CategoriaService categoriaService) {
        this.categoriaService = categoriaService;
    }

    // ENDPOINT RECUPERAR TODAS LAS CATEGORIAS
    @GetMapping
    public List<CategoriaServicio> getAllCategorias() {
        return categoriaService.getAllCategorias();
    }

    // ENDPOINT GESTIONAR LAS CATEGORIAS
    @PostMapping("/gestionar")
    public ResponseEntity<?> gestionarCategoria(@RequestBody Map<String, Object> payload) {
        return ResponseEntity.ok(categoriaService.gestionarCategoria(payload));
    }
}