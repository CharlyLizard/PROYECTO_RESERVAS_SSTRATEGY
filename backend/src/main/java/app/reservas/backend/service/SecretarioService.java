package app.reservas.backend.service;

import app.reservas.backend.entity.Proveedor;
import app.reservas.backend.entity.Secretario;
import app.reservas.backend.repository.ProveedorRepository;
import app.reservas.backend.repository.SecretarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class SecretarioService {

    private final SecretarioRepository secretarioRepository;
    private final ProveedorRepository proveedorRepository;
    @Autowired
    public SecretarioService(SecretarioRepository secretarioRepository, ProveedorRepository proveedorRepository) {
        this.secretarioRepository = secretarioRepository;
        this.proveedorRepository = proveedorRepository;
    }

    public List<Secretario> getAllSecretarios() {
        return secretarioRepository.findAll();
    }
    
    @SuppressWarnings("unchecked")
    public Map<String, Object> gestionarSecretario(Map<String, Object> payload) {
        String accion = (String) payload.get("accion");
        Map<String, Object> secretarioMap = (Map<String, Object>) payload.get("secretario");

        Secretario secretario = new Secretario();
        if (secretarioMap != null) {
            if (secretarioMap.get("id") != null) {
                secretario.setId(Long.valueOf(secretarioMap.get("id").toString()));
            }
            secretario.setNombre((String) secretarioMap.get("nombre"));
            secretario.setApellido((String) secretarioMap.get("apellido"));
            secretario.setNombreUsuario((String) secretarioMap.get("nombreUsuario"));
            secretario.setEmail((String) secretarioMap.get("email"));
            secretario.setTelefono((String) secretarioMap.get("telefono"));
            secretario.setTelefonoMovil((String) secretarioMap.get("telefonoMovil"));
            secretario.setDomicilio((String) secretarioMap.get("domicilio"));
            secretario.setCiudad((String) secretarioMap.get("ciudad"));
            secretario.setEstado((String) secretarioMap.get("estado"));
            secretario.setCodigoPostal((String) secretarioMap.get("codigoPostal"));
            secretario.setNotas((String) secretarioMap.get("notas"));
            secretario.setCalendario((String) secretarioMap.get("calendario"));
            secretario.setIdioma((String) secretarioMap.get("idioma"));
            secretario.setZonaHoraria((String) secretarioMap.get("zonaHoraria"));
            secretario.setRecibirNotificaciones(secretarioMap.get("recibirNotificaciones") != null ? Boolean.valueOf(secretarioMap.get("recibirNotificaciones").toString()) : false);
        }

        switch (accion) {
            case "add":
                secretario.setId(null);
                secretarioRepository.save(secretario);
                break;
            case "edit":
                if (secretario.getId() != null && secretarioRepository.existsById(secretario.getId())) {
                    secretarioRepository.save(secretario);
                }
                break;
            case "delete":
                if (secretario.getId() != null && secretarioRepository.existsById(secretario.getId())) {
                    secretarioRepository.deleteById(secretario.getId());
                }
                break;
        }

        List<Secretario> secretarios = secretarioRepository.findAll();
        return Map.of("secretarios", secretarios);
    }

    @Transactional
    public Secretario asignarProveedorASecretario(Long secretarioId, Long proveedorId) {
        Secretario secretario = secretarioRepository.findById(secretarioId)
                .orElseThrow(() -> new RuntimeException("Secretario no encontrado con ID: " + secretarioId));

        if (proveedorId == null) {
            secretario.setProveedor(null);
        } else {
            Proveedor proveedor = proveedorRepository.findById(proveedorId)
                    .orElseThrow(() -> new RuntimeException("Proveedor no encontrado con ID: " + proveedorId));
            
            Optional<Secretario> secretarioAnteriorOpt = secretarioRepository.findByProveedor_Id(proveedorId);
            if(secretarioAnteriorOpt.isPresent()){
                Secretario secretarioAnterior = secretarioAnteriorOpt.get();
                if(!secretarioAnterior.getId().equals(secretarioId)){ // Si no es el mismo secretario
                    secretarioAnterior.setProveedor(null);
                    secretarioRepository.save(secretarioAnterior);
                }
            }
            secretario.setProveedor(proveedor);
        }
        return secretarioRepository.save(secretario);
    }

    public List<Secretario> getSecretariosDisponiblesParaProveedorDropdown(Long proveedorIdActual) {
        if (proveedorIdActual == null) {
            return secretarioRepository.findByProveedorIsNull();
        }
        return secretarioRepository.findByProveedor_IdOrProveedorIsNull(proveedorIdActual);
    }
}