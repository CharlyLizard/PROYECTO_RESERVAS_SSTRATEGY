package app.reservas.backend.service;

import app.reservas.backend.entity.Coche;
import app.reservas.backend.repository.CocheRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CocheService {

    private final CocheRepository cocheRepository;

    public CocheService(CocheRepository cocheRepository) {
        this.cocheRepository = cocheRepository;
    }

    public List<Coche> obtenerTodos() {
        return cocheRepository.findAll();
    }
}