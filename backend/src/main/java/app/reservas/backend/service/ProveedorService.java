package app.reservas.backend.service;

import app.reservas.backend.entity.Proveedor;
import app.reservas.backend.entity.Servicio;
import app.reservas.backend.repository.ProveedorRepository;
import app.reservas.backend.repository.ServicioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class ProveedorService {

    private final ProveedorRepository proveedorRepository;
    private final ServicioRepository servicioRepository;

    @Autowired
    public ProveedorService(ProveedorRepository proveedorRepository, ServicioRepository servicioRepository) {
        this.proveedorRepository = proveedorRepository;
        this.servicioRepository = servicioRepository;
    }

    public List<Proveedor> getAllProveedores() {
        return proveedorRepository.findAll();
    }

    public Map<String, Object> gestionarProveedor(Map<String, Object> payload) {
        String accion = (String) payload.get("accion");
        Map<String, Object> proveedorMap = (Map<String, Object>) payload.get("proveedor");

        Proveedor proveedor = new Proveedor();
        if (proveedorMap != null) {
            if (proveedorMap.get("id") != null) {
                proveedor.setId(Long.valueOf(proveedorMap.get("id").toString()));
            }
            proveedor.setNombre((String) proveedorMap.get("nombre"));
            proveedor.setApellido((String) proveedorMap.get("apellido"));
            proveedor.setNombreUsuario((String) proveedorMap.get("nombreUsuario"));
            proveedor.setEmail((String) proveedorMap.get("email"));
            proveedor.setTelefono((String) proveedorMap.get("telefono"));
            proveedor.setTelefonoMovil((String) proveedorMap.get("telefonoMovil"));
            proveedor.setDomicilio((String) proveedorMap.get("domicilio"));
            proveedor.setCiudad((String) proveedorMap.get("ciudad"));
            proveedor.setEstado((String) proveedorMap.get("estado"));
            proveedor.setCodigoPostal((String) proveedorMap.get("codigoPostal"));
            proveedor.setNotas((String) proveedorMap.get("notas"));

            // Relación con Servicio
            if (proveedorMap.get("servicioId") != null) {
                Long servicioId = Long.valueOf(proveedorMap.get("servicioId").toString());
                Servicio servicio = servicioRepository.findById(servicioId).orElse(null);
                proveedor.setServicio(servicio);
            }
        }

        switch (accion) {
            case "add":
                proveedor.setId(null);
                proveedorRepository.save(proveedor);
                break;
            case "edit":
                if (proveedor.getId() != null && proveedorRepository.existsById(proveedor.getId())) {
                    proveedorRepository.save(proveedor);
                }
                break;
            case "delete":
                if (proveedor.getId() != null && proveedorRepository.existsById(proveedor.getId())) {
                    proveedorRepository.deleteById(proveedor.getId());
                }
                break;
        }

        List<Proveedor> proveedores = proveedorRepository.findAll();
        return Map.of("proveedores", proveedores);
    }
}