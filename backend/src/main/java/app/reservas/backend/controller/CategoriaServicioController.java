package app.reservas.backend.controller;

import app.reservas.backend.entity.CategoriaServicio;
import app.reservas.backend.repository.CategoriaServicioRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/categorias")
@RequiredArgsConstructor
public class CategoriaServicioController {

    private final CategoriaServicioRepository categoriaServicioRepository;

    @GetMapping
    public List<CategoriaServicio> getAllCategorias() {
        return categoriaServicioRepository.findAll();
    }
}