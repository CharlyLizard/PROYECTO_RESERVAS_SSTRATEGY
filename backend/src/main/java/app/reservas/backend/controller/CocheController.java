package app.reservas.backend.controller;

import app.reservas.backend.entity.Coche;
import app.reservas.backend.service.CocheService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/coches")
public class CocheController {

    private final CocheService cocheService;

    public CocheController(CocheService cocheService) {
        this.cocheService = cocheService;
    }

    @GetMapping
    public List<Coche> obtenerTodos() {
        return cocheService.obtenerTodos();
    }
}