package app.reservas.backend.service;

import app.reservas.backend.entity.Servicio;
import app.reservas.backend.repository.ServicioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ServicioService {

    @Autowired
    private ServicioRepository servicioRepository;

    public List<Servicio> getServiciosSeleccionados() {
        return servicioRepository.findByIsSelectedTrue();
    }

    public List<Servicio> getAllServicios() {
        return servicioRepository.findAll();
    }
}