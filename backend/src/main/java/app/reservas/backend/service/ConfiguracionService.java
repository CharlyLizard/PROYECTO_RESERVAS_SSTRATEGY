package app.reservas.backend.service;

import app.reservas.backend.entity.Configuracion;
import app.reservas.backend.repository.ConfiguracionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class ConfiguracionService {

    private final ConfiguracionRepository configuracionRepository;

    @Autowired
    public ConfiguracionService(ConfiguracionRepository configuracionRepository) {
        this.configuracionRepository = configuracionRepository;
    }

    public Configuracion getConfiguracion() {
        // Asume que solo hay una fila en la tabla de configuración
        return configuracionRepository.findById(1L).orElse(new Configuracion());
    }

    public Configuracion saveConfiguracion(Configuracion configuracion) {
    // Carga la configuración existente desde la base de datos
    Configuracion existente = configuracionRepository.findById(1L).orElse(new Configuracion());

    // Actualiza los campos de la configuración existente con los nuevos valores
    existente.setNombreEmpresa(configuracion.getNombreEmpresa());
    existente.setEmailEmpresa(configuracion.getEmailEmpresa());
    existente.setEnlaceEmpresa(configuracion.getEnlaceEmpresa());
    existente.setLogotipoUrl(configuracion.getLogotipoUrl());
    existente.setColorCorporativo(configuracion.getColorCorporativo());
    existente.setTema(configuracion.getTema());
    existente.setFormatoFecha(configuracion.getFormatoFecha());
    existente.setPrimerDiaSemana(configuracion.getPrimerDiaSemana());
    existente.setIdiomaPredeterminado(configuracion.getIdiomaPredeterminado());
    existente.setZonaHorariaPredeterminada(configuracion.getZonaHorariaPredeterminada());

    // Guarda la configuración actualizada
    return configuracionRepository.save(existente);
}
}