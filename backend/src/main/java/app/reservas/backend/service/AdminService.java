package app.reservas.backend.service;

import app.reservas.backend.entity.Admin;
import app.reservas.backend.repository.AdminRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.List;
import java.util.Map;

@Service
public class AdminService {

    private final AdminRepository adminRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    public AdminService(AdminRepository adminRepository) {
        this.adminRepository = adminRepository;
    }

    public List<Admin> getAllAdmins() {
        return adminRepository.findAll();
    }

    public Map<String, Object> gestionarAdmin(Map<String, Object> payload) {
        String accion = (String) payload.get("accion");
        Map<String, Object> adminMap = (Map<String, Object>) payload.get("admin");

        Admin admin = new Admin();
        if (adminMap != null) {
            if (adminMap.get("id") != null) {
                admin.setId(Long.valueOf(adminMap.get("id").toString()));
            }
            admin.setNombre((String) adminMap.get("nombre"));
            admin.setApellido((String) adminMap.get("apellido"));
            admin.setNombreUsuario((String) adminMap.get("nombreUsuario"));
            admin.setEmail((String) adminMap.get("email"));
            admin.setTelefono((String) adminMap.get("telefono"));
            admin.setTelefonoMovil((String) adminMap.get("telefonoMovil"));
            admin.setDomicilio((String) adminMap.get("domicilio"));
            admin.setCiudad((String) adminMap.get("ciudad"));
            admin.setEstado((String) adminMap.get("estado"));
            admin.setCodigoPostal((String) adminMap.get("codigoPostal"));
            admin.setNotas((String) adminMap.get("notas"));
            admin.setCalendario((String) adminMap.get("calendario"));
            admin.setIdioma((String) adminMap.get("idioma"));
            admin.setZonaHoraria((String) adminMap.get("zonaHoraria"));
            admin.setRecibirNotificaciones(adminMap.get("recibirNotificaciones") != null ? Boolean.valueOf(adminMap.get("recibirNotificaciones").toString()) : false);

            // Hashear la contraseña solo si viene en el payload
            if (adminMap.get("password") != null && !((String)adminMap.get("password")).isEmpty()) {
                admin.setPassword(passwordEncoder.encode((String) adminMap.get("password")));
            } else if (accion.equals("edit") && admin.getId() != null) {
                // Mantener la contraseña anterior si no se envía una nueva
                admin.setPassword(adminRepository.findById(admin.getId()).map(Admin::getPassword).orElse(null));
            }
        }

        switch (accion) {
            case "add":
                admin.setId(null);
                adminRepository.save(admin);
                break;
            case "edit":
                if (admin.getId() != null && adminRepository.existsById(admin.getId())) {
                    adminRepository.save(admin);
                }
                break;
            case "delete":
                if (admin.getId() != null && adminRepository.existsById(admin.getId())) {
                    adminRepository.deleteById(admin.getId());
                }
                break;
        }

        List<Admin> administradores = adminRepository.findAll();
        return Map.of("administradores", administradores);
    }
}